import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  PermissionsAndroid,
  Linking,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

class LocationScreen extends Component {
  state = {
    location: false,
    distance: null, // tambahkan state distance untuk menyimpan hasil perhitungan jarak
  };

  // Function to get permission for location
  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // function to check permissions and get Location
  getLocation = () => {
    const result = this.requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            this.setState({location: position});
            this.calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
            );
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            this.setState({location: false});
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );

        // Watch for location changes
        Geolocation.watchPosition(
          position => {
            console.log(position);
            this.setState({location: position});
            this.calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
            );
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            this.setState({location: false});
          },
          {enableHighAccuracy: true, distanceFilter: 10},
        );
      }
    });
  };

  //Fungsi componentDidMount akan otomatis dijalankan setelah komponen diload.
  componentDidMount() {
    this.getLocation();
    console.log('Fungsi componentDidMount sudah dipanggil.');
  }

  // Function to calculate distance between two coordinates using Haversine formula (jarak dalam satuan KM)
  calculateDistance = (lat1, lon1) => {
    const lat2 = 1.4176958556026646; // koordinat latitude Universitas Klabat
    const lon2 = 124.98398510245137; // koordinat longitude Universitas Klabat
    const R = 6371; // radius of the earth in km
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000;
    this.setState({distance: distance.toFixed(2)}); // set the state of distance
  };

  toRad = value => {
    return (value * Math.PI) / 180;
  };

  render() {
    const {location, distance} = this.state;
    return (
      <View style={styles.container}>
        <Text>Hi students !!!</Text>
        <View
          style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
          <Button title="Get Location" onPress={this.getLocation} />
        </View>
        <Text>Latitude: {location ? location.coords.latitude : '?'}</Text>
        <Text>Longitude: {location ? location.coords.longitude : '?'}</Text>
        <Text>Jarak dengan Unklab: {distance ? distance : '?'} meter.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LocationScreen;
