import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import soundGif from '../assets/hirobot.gif';

const ChangePassScreen = ({navigation, route}) => {
  const {jsonData} = route.params;
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  // set oldPass and newPass to empty string on screen focus
  useFocusEffect(
    React.useCallback(() => {
      setOldPass('');
      setNewPass('');
    }, []),
  );

  const handleChangePass = () => {
    // check if old pass and new pass are not empty or only spaces
    if (!oldPass.trim() && !newPass.trim()) {
      Alert.alert(
        'Error Message',
        'Input old password and new password fields cannot be empty or contain only spaces.',
      );
      return;
    }

    if (oldPass === newPass) {
      Alert.alert(
        'Error Message',
        'Input password fields must be different from the previous one.',
      );
      return;
    }

    if (!oldPass.trim()) {
      Alert.alert(
        'Error Message',
        'Input old password field cannot be empty or contain only spaces.',
      );
      return;
    }

    if (!newPass.trim()) {
      Alert.alert(
        'Error Message',
        'Input new password field cannot be empty or contain only spaces.',
      );
      return;
    }

    // create request body with email and password input values
    const requestBody = {
      'input-old-password': oldPass,
      'input-new-password': newPass,
      'email-user': jsonData[0].email,
    };

    // Time out request data
    const timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out.'));
      }, 5000); // 5000 (5 detik)
    });

    Promise.race([
      fetch(
        'https://coursebot.online/admin/adminchatbot/mobile/changepasswordmobile.php',
        {
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
        },
      ),
      timeoutPromise,
    ])
      .then(response => response.text())
      .then(textData => {
        // handle response data
        console.log(textData);

        // check if textData contains "ERROR"
        if (textData.includes('ERROR')) {
          // handle error case
          //console.error("Login failed:", textData);
          Alert.alert(
            'Error Message',
            'Sorry, change password failed. Please try again.',
          );
          return;
        }

        // check if textData contains "INCORRECT"
        if (textData.includes('INCORRECT')) {
          // handle INCORRECT case
          Alert.alert(
            'Error Message',
            'Sorry, you put incorrect old password. Please try again.',
          );
          return;
        }

        if (textData.includes('SUCCESS')) {
          Alert.alert(
            'Password Changed',
            'Student password has been changed successfully. Please sign in with the new password.',
          );
          // redirect to SignInScreen on successful change password
          navigation.navigate('SignInScreen');
        }
      })
      .catch(error => {
        //console.error(error);
        Alert.alert('Error Message', error.message);
        return;
      });
  };

  return (
    <View style={styles.container}>
      {/* header */}

      <LinearGradient
        colors={['#541690', 'rgba(118, 53, 181, 0.66)']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0, 1]}
        style={styles.header}>
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => navigation.navigate('HomeScreen', {jsonData})}>
          <Image
            source={require('../assets/icons/backleft.png')}
            style={{...styles.backImage, width: 30, height: 30}}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Password</Text>
      </LinearGradient>

      {/* user profile */}
      <View style={styles.userProfile}>
        <View style={styles.userProfileLeft}>
          <Image
            source={require('../assets/icons/user1.png')}
            style={styles.user}
          />

          <View>
            {/* <Text style={styles.userProfileFullName}>
              {jsonData[0].fullname}
            </Text> */}
            <Text style={styles.userProfileEmail}>{jsonData[0].fullname}</Text>
            <Text style={styles.userProfileEmail}>{jsonData[0].email}</Text>
          </View>
        </View>
        <View style={styles.userProfileRight} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Enter your old and new passwords:
        </Text>
        <View style={styles.inputContainer}>
          <Icon
            name="lock-closed"
            size={20}
            color="#333"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            placeholderTextColor={'#ABABA7'}
            secureTextEntry={true}
            value={oldPass}
            onChangeText={setOldPass}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon
            name="lock-closed"
            size={20}
            color="#333"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor={'#ABABA7'}
            secureTextEntry={true}
            value={newPass}
            onChangeText={setNewPass}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleChangePass}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAEAF5',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
    marginBottom: 10,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  input: {
    flex: 1,
    color: '#003f5c',
  },
  welcomeText: {
    color: '#541690',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Poppins-Bold',
    position: 'absolute',
    top: -30,
    left: 20,
  },
  user: {
    width: 50, // Updated width to 90
    height: 50, // Updated height to 90
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    right: 100,
  },
  notificationIcon: {
    position: 'relative',
    right: 0,
    top: 0,
  },
  backImage: {
    width: 24,
    height: 24,
  },
  userProfile: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: 'black',
    top: 60,

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 20,
  },

  userProfileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userProfileText: {
    color: '#05375a',
    marginLeft: 10,
    fontSize: 14,
  },
  userProfileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#541690',
    marginBottom: -5,
    marginLeft: 10,
  },
  // userProfileFullName: {
  //   color: '#05375a',
  //   marginLeft: 10,
  //   fontSize: 16,
  // },
  userProfileRight: {
    justifyContent: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'flex-start', // on top
    marginTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
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
    elevation: 10,
  },
  inputIcon: {
    margin: 10,
    width: 20,
  },
  button: {
    backgroundColor: '#541690',
    paddingVertical: 10,
    borderRadius: 25,
    top: 25,
    alignItems: 'center',
    height: 48,
    width: '100%',
    elevation: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 19,
  },
  footer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: -10,
    backgroundColor: '#00bfff',
  },
  footerText: {
    color: '#666',
    color: 'white',
  },
  gifImage: {
    height: 250,
    width: 260,
    marginTop: 20,
  },
});

export default ChangePassScreen;
