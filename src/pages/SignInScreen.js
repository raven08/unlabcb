import React, {useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      loadRememberedCredentials();
    }, []),
  );

  useEffect(() => {
    if (rememberMe) {
      saveRememberedCredentials();
    } else {
      removeRememberedCredentials();
    }
  }, [email, password, rememberMe]);

  const loadRememberedCredentials = async () => {
    try {
      const rememberedEmail = await AsyncStorage.getItem('rememberedEmail');
      const rememberedPassword = await AsyncStorage.getItem(
        'rememberedPassword',
      );
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        setPassword(rememberedPassword);
        setRememberMe(true);
      }
    } catch (error) {
      console.error('Error loading remembered credentials:', error);
    }
  };

  const saveRememberedCredentials = async () => {
    try {
      await AsyncStorage.setItem('rememberedEmail', email);
      await AsyncStorage.setItem('rememberedPassword', password);
    } catch (error) {
      console.error('Error saving remembered credentials:', error);
    }
  };

  const removeRememberedCredentials = async () => {
    try {
      await AsyncStorage.removeItem('rememberedEmail');
      await AsyncStorage.removeItem('rememberedPassword');
    } catch (error) {
      console.error('Error removing remembered credentials:', error);
    }
  };

  const handleSignIn = () => {
    if (!email.trim() && !password.trim()) {
      showAlert(
        'Error Message',
        'Input email and password fields cannot be empty or contain only spaces.',
      );
      return;
    }

    if (!email.trim()) {
      showAlert(
        'Error Message','Input email field cannot be empty or contain only spaces.',
      );
      return;
    }

    if (!password.trim()) {
      showAlert(
        'Error Message','Input password field cannot be empty or contain only spaces.',
      );
      return;
    }

    const requestBody = {
      'input-email': email,
      'input-password': password,
    };

    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out'));
      }, 10000);
    });

    Promise.race([
      fetch('https://coursebot.online/admin/adminchatbot/mobile/loginmobile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.keys(requestBody)
          .map(
            key =>
              `${encodeURIComponent(key)}=${encodeURIComponent(
                requestBody[key],
              )}`,
          )
          .join('&'),
      }),
      timeoutPromise,
    ])
      .then(response => response.text())
      .then(textData => {
        console.log(textData);

        if (textData.includes('ERROR')) {
          showAlert('Error Message', 'Sorry, login failed. Please Sign Up!!');
          return;
        }

        if (textData.includes('SUCCESS')) {
          const dataArray = textData.split('SUCCESS');
          const jsonString = dataArray[1];

          const jsonData = JSON.parse(jsonString);

          navigation.navigate('HomeScreen', {jsonData});
        }
      })
      .catch(error => {
        showAlert('Error Message', error.message);
        return;
      });
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/icons/login.png')}
        style={styles.image}
        resizeMode="cover">
        
        <Animatable.View animation="zoomInUp" style={styles.formContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Icon name="user" size={18} color="#ABABA7" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              placeholderTextColor="#ABABA7"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputIcon}>
              <Icon name="lock" size={18} color="#ABABA7" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ABABA7"
              value={password}
              onChangeText={text => setPassword(text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}>
              <Icon
                name={showPassword ? 'eye' : 'eye-slash'}
                size={22}
                color="#ABABA7"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.rememberMeContainer}>
            <View style={[styles.rememberMeIconContainer, {marginLeft: 4}]}>
              {rememberMe ? (
                <Icon name="check-square" size={20} color="#ABABA7" />
              ) : (
                <Icon name="square" size={20} color="#ABABA7" />
              )}
            </View>
            <Text
              style={styles.rememberMeText}
              onPress={() => setRememberMe(!rememberMe)}>
              <Text style={{color: '#ABABA7', fontSize: 15}}>Remember Me</Text>
            </Text>
          </View>
          <View style={{marginBottom: 25}}></View>
          <TouchableOpacity onPress={handleSignIn}>
            <LinearGradient
              colors={['#541690', '#541690']}
              style={styles.loginButton}>
              <Text style={styles.loginText}>LOGIN</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
        <View style={styles.logoContainer}>
          <Animatable.Image
            animation="zoomIn"
            source={require('../assets/icons/cb.png')}
            style={styles.logo}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAF5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputIcon: {
    paddingRight: 5,
  },
  redText: {
    color: 'red',
  },
  welcomeText: {
    color: '#541690',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    height: '50%',
  },
  logo: {
    width: 120,
    height: 120,
  },
  logoText: {
    color: 'black',
    fontSize: 30,
    marginTop: 10,
    fontFamily: 'Poppins-Bold',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 34,
    paddingVertical: 50,
    paddingHorizontal: 20,
    width: '90%',
    height: '55%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
    alignSelf: 'center',
    position: 'absolute',
    top: '25%',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF8DC',
    borderRadius: 25,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    color: '#003f5c',
  },
  forgotPassword: {
    color: '#003f5c',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  loginButton: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  loginText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 15,
  },
  registerText: {
    color: '#003f5c',
    fontSize: 15,
    alignSelf: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginRight: 180,
  },
});

export default SignInScreen;
