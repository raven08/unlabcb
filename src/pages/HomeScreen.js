import React, {useState, useEffect, useRef} from 'react';
import {BackHandler, ImageBackground} from 'react-native';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = ({navigation, route}) => {
  const {jsonData} = route.params;

  useEffect(() => {
    const backAction = () => {
      const currentPos = navigation.getState().routes;
      const currentRouteName = currentPos[currentPos.length - 1].name;
      console.log('Nama screen sekarang: ' + currentRouteName);

      if (currentRouteName === 'HomeScreen') {
        handleButtonPress();
      } else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  const handleButtonPress = () => {
    Alert.alert(
      'Confirm Dialog',
      'Are you sure you want to exit?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: () => {
            console.log('Keluar Dilanjutkan dari HomeScreen.');
            navigation.navigate('SignInScreen');
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/icons/login.png')}
        style={styles.image}
        resizeMode="cover">
        <Animatable.View animation="zoomInUp">
          <Text style={styles.text1}>Welcome to CourseBot</Text>
          <Text style={styles.text2}>Apps</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileScreen', {jsonData})}>
            <View style={styles.circle} />
            <Image
              source={require('../assets/icons/userhome.png')}
              style={styles.Profil}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ChatScreen', {jsonData})}>
            <View style={styles.getback} />
            <Text style={styles.gettext}>Get Started</Text>
            <Image
              source={require('../assets/icons/get.png')}
              style={styles.get}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassScreen', {jsonData})}>
            <View style={styles.back2} />
            <Icon name="cog" size={40} color="#000" style={styles.icon} />
            <Text style={styles.text4}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('CurriculumScreen', {jsonData})}>
            <View style={styles.back} />
            <Image
              source={require('../assets/icons/cur.png')}
              style={styles.cur}
            />
            <Text style={styles.text3}>View Curriculum</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleButtonPress}>
            <View style={styles.back1} />
            <Icon name="sign-out" size={40} color="#000" style={styles.exit} />
            <Text style={styles.text5}>Exit App</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Styles used in the return statement
  image: {
    width: '100%',
    height: '100%',
  },
  circle: {
    width: 60,
    height: 60,
    top: -70,
    left: 10,
    borderRadius: 60,
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 10,
  },
  Profil: {
    position: 'absolute',
    top: -55,
    left: 25,
  },
  getback: {
    top: 500,
    width: 315,
    height: 45,
    left: 40,
    backgroundColor: '#FFCD38',
    borderRadius: 30,
    elevation: 10,
    position: 'absolute',
  },
  gettext: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    top: 500,
    left: 50,
    color: '#000000',
    position: 'absolute',
  },
  get: {
    top: 510,
    right: 60,
    position: 'absolute',
  },
  text1: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    top: 90,
    margin: 1,
    paddingLeft: 50,
    paddingRight: 50,
  },
  text2: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    top: 80,
    margin: 1,
    paddingLeft: 150,
    paddingRight: 50,
  },
  back: {
    width: 140,
    height: 80,
    top: 160,
    left: 45,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 10,
  },
  back1: {
    width: 140,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 25,
    top: 270,
    left: 120,
    elevation: 10,
  },
  back2: {
    width: 140,
    height: 80,
    top: 180,
    right: 45,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 10,
  },
  text3: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#541690',
    top: 205,
    margin: 1,
    paddingLeft: 70,
    paddingRight: 50,
  },
  text4: {
    fontSize: 10,
    fontFamily: 'Poppins-Bold',
    color: '#541690',
    top: 230,
    margin: 1,
    left: 175,
    paddingLeft: 55,
    paddingRight: 20,
  },
  text5: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#541690',
    top: 245,
    margin: 1,
    left: 115,
    paddingLeft: 55,
    paddingRight: 20,
  },
  exit: {
    position: 'absolute',
    top: 285,
    right: 179,
  },
  cur: {
    position: 'absolute',
    top: 165,
    left: 100,
  },
  icon: {
    position: 'absolute',
    top: 190,
    right: 30,
    width: 100,
    height: 50, // Sesuaikan jarak ikon ke teks sesuai kebutuhan
  },
});

export default HomeScreen;
