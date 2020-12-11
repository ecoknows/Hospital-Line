import React, { useEffect, useState } from 'react';
import { StyleSheet, View} from 'react-native';
import * as Permissions from 'expo-permissions';
import { Map, SplashScreen } from './screens';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const  getFonts =()=> Font.loadAsync({
  'Teko' : require('./assets/fonts/Teko-Regular.ttf'),
  'Roboto' : require('./assets/fonts/Roboto-Medium.ttf'),
  'Roboto-Bold' : require('./assets/fonts/Roboto-Bold.ttf'),
  'Open-Sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
  'Archivo-Bold' : require('./assets/fonts/Archivo-Bold.ttf'),
});

export default function Main(){
  const [permission, askForPermission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(()=>{
      
    if (!permission || permission.status !== 'granted') {
      askForPermission(); 
    }
  });
 
  
  if(fontsLoaded){
    return(
    <View style={styles.container}>
      <SplashScreen/>
    </View>
    );
  } else {
    
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={()=>setFontsLoaded(true)}
      />
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});