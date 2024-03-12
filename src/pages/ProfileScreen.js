import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);

    const {jsonData} = this.props.route.params;

    this.state = {
      jsonData: jsonData,
    };
  }

  renderContent() {
    return (
      <View style={styles.contentContainer}>
        <LinearGradient
          style={styles.bulatan}
          colors={['#541690', 'rgba(118, 53, 181, 0.66)']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 1]}
        />
        <View style={styles.circle} />
        <Image
          source={require('../assets/icons/user1.png')}
          style={styles.user}
        />

        <Text style={styles.userInfoName}>
          {this.state.jsonData[0].fullname}
        </Text>
        <Text style={styles.userInfoNim}>
          {this.state.jsonData[0].nim}/{this.state.jsonData[0].reg_num}
        </Text>
        <View style={styles.facultyContainer}>
          <Image
            source={require('../assets/icons/school1.png')}
            style={styles.l}
          />
          <Text style={styles.textdata}> {this.state.jsonData[0].faculty}</Text>
        </View>
        <View style={styles.facultyContainer}>
          <Image
            source={require('../assets/icons/book1.png')}
            style={styles.l}
          />
          <Text style={styles.textdata}>
            {' '}
            {this.state.jsonData[0].prog_study}
          </Text>
        </View>
        <View style={styles.facultyContainer}>
          <Image
            source={require('../assets/icons/news1.png')}
            style={styles.l}
          />
          <Text style={styles.textdata}>
            {' '}
            {this.state.jsonData[0].curriculum_name}
          </Text>
        </View>
        <View style={styles.facultyContainer}>
          <Image source={require('../assets/icons/e.png')} style={styles.l} />
          <Text style={styles.textdata}> {this.state.jsonData[0].email}</Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            this.props.navigation.navigate('HomeScreen', {
              jsonData: this.state.jsonData,
            })
          }>
          <Image
            source={require('../assets/icons/backleft.png')}
            style={{...styles.backImage, width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return <View style={styles.container}>{this.renderContent()}</View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 20,
    backgroundColor: '#EAEAF5',
  },
  l: {
    marginLeft: 20,
  },
  userInfoName: {
    fontWeight: 'bold',
    top: -410,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
  },
  userInfoNim: {
    fontWeight: 'bold',
    top: -220,
    textAlign: 'center',
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: '#541690',
    marginBottom: 8,
  },
  bulatan: {
    position: 'relative',
    width: 500,
    height: 500,
    borderRadius: 250,
    left: -55,
    right: 250,
    top: -270,
  },
  circle: {
    width: 150,
    height: 150,
    top: 150,
    left: 115,
    borderRadius: 114,
    backgroundColor: 'white',
    position: 'absolute',
    elevation: 10,
  },
  user: {
    position: 'absolute',
    top: 180,
    left: 145,
    width: 90, // Updated width to 90
    height: 90, // Updated height to 90
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    backgroundColor: '#00bfff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: -90,
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
  containerprofile: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  iconContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  profilImage: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  text: {
    fontSize: 18,
    color: '#05375a',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  textdata: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: '#541690',
    marginBottom: -5,
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#00bfff',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 50,
    width: '50%',
    marginLeft: 100,
    marginTop: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  lockIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  backButton: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  facultyContainer: {
    flexDirection: 'row',

    alignItems: 'center',
    marginBottom: 20,
    width: 315, // Set width to 315
    height: 44, // Set height to 44
    backgroundColor: '#FFFDFD',
    borderRadius: 30,
    top: -190,
    alignSelf: 'center', // Add this line to center the container
    elevation: 10,
  },
});

export default ProfileScreen;
