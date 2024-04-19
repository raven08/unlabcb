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
          <View style={styles.header}>
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
          </View>

          <View>
            <TouchableOpacity
              style={styles.btnchat}
              onPress={() => navigation.navigate('ChatScreen', {jsonData})}>
              <Text style={styles.textchat}>
                Get Started{'                 '}
                <Icon
                  name="arrow-right"
                  size={30}
                  color="black"
                />
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigation.navigate('CurriculumScreen', {
                  jsonData,
                })
              }>
              <Image
                source={require('../assets/icons/cur.png')}
                style={styles.menuItemImageChangePass}
              />

              <Text style={styles.menuItemText}>View Curriculum</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() =>
                navigation.navigate('ChangePassScreen', {jsonData})
              }>
              <Icon
                name="cog"
                size={40}
                color="#000"
                style={styles.menuItemImageProfile}
              />
              <Text style={styles.menuItemText}>Change Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuItem1}
              onPress={handleButtonPress}>
              <Icon
                name="sign-out"
                size={40}
                color="#000"
                style={styles.menuItemImageFaq}
              />
              <Text style={styles.menuItemText}>Exit App</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {},
  btnchat: {
    position: 'absolute',
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginTop: 550,
    marginBottom: 30,
    borderRadius: 50,
    width: 325,
    left: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFCD38',
    shadowColor: 'black',
    elevation: 15,
  },
  textchat: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    fontWeight: 'bold',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 70,
  },
  menuItem: {
    width: 150,
    height: 85,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -60,
    marginTop: 120,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem1: {
    width: 150,
    height: 85,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: -60,
    marginTop: 100,
    shadowColor: 'black',
    left: 100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemImageFaq: {
    marginBottom: 5,
  },
  menuItemImageChangePass: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  menuItemImageProfile: {
    marginBottom: 5,
  },
  menuItemText: {
    fontFamily: 'Poppins-Bold',
    color: '#541690',
    marginTop: 0,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Styles used in the return statement
  image: {
    width: '100%',
    height: '100%',
  },
  circle: {
    width: 70,
    height: 70,
    top: -60,
    left: 10,
    borderRadius: 60,
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 10,
  },
  Profil: {
    position: 'absolute',
    top: -45,
    left: 30,
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
    fontSize: 30,
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
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    top: 100,
    margin: 1,
    textAlign: 'center',
  },
  text2: {
    fontSize: 30,
    fontFamily: 'Poppins-Bold',
    color: 'white',
    top: 90,
    margin: 1,
    textAlign: 'center',
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
