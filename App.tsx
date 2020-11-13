import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const initialState = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};



export default function Main(){
  const [currentLocation,  setCurrentLocation] = useState(initialState);
  
  const [data, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  useEffect(()=>{
   

    navigator.geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
        });
        },
      error => alert(error.message),
      { timeout : 20000, maximumAge: 1000}
    )

    setCurrentLocation({
      ...currentLocation,
      latitude: 37.78825,
      longitude: -122.4324,
    });
    
    _toggle();
    return () => {
      _unsubscribe();
    };
  },[]);


  Magnetometer.setUpdateInterval(16);
  
  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };


  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener(result => {
        setData(result);
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const { x, y, z } = data;
  
  

  let angle = Math.atan2(round(y), round(x));
  angle = angle * (180 / Math.PI)
  angle = angle + 90
  angle = (angle +360) % 360 
  
  return(
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.container}
      initialRegion={currentLocation}
    >
      <Marker
        coordinate={currentLocation}
        image={require('./assets/bee.png')}
        style={{transform: [{
          rotate: `${Math.round(angle)}`+'deg',
        }]}}
      >

      </Marker>
    </MapView>
  );
}


function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});