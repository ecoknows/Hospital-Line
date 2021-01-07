import React,{useEffect, useRef, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../constants';
import {
  Emergency,
  HealthTips,
  MedicineReminder,
  Notifications,
  Map,
  SplashScreen,
  Dashboard,
  DoctorList,
  DoctorClick,
  Clinic,
  Hospital
} from '../screens';
import {StyleSheet, Dimensions, Keyboard} from 'react-native';
import { Pic, View, Text, Input, List} from '../components';
import { firebase_get_collection} from '../database/Firebase';
import Appointment from '../screens/options/appointment/Appointment';
import {useSelector} from 'react-redux';
import { RootState } from '../brain/redux';

  
const dashboard = createStackNavigator();

function Navigation(){
  const navigationRef = useRef(null);
  const { homebtn } = useSelector((state: RootState) => state.dashboard)
  
  return(
    <NavigationContainer ref={navigationRef}>
      <dashboard.Navigator initialRouteName="Dashboard" mode='modal' screenOptions={{animationEnabled: false}}>
        <dashboard.Screen
          name='SplashScreen' component={SplashScreen} 
          options={{ title: 'Splash Screen', headerShown: false}} /> 
        <dashboard.Screen
          name='AppointmentTopTab' component={Appointment}options={{
            title: 'Appointment',
            headerStyle: {
              backgroundColor: theme.color.light_blue,
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
            headerBackImage: ()=> <Pic
            src={require('../assets/icons/back.png')}/>,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.font.ARIAL_BOLD,
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center',
          
          }}
          
        />
        <dashboard.Screen
          name='Dashboard' component={Dashboard} 
          options={{ title: 'Dashboard', headerShown: false}} />

        <dashboard.Screen
          name='DoctorList' component={DoctorList} 
          options={{
            title: 'Doctor List',
            headerStyle: {
              backgroundColor: theme.color.light_blue,
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
            headerBackImage: ()=> <Pic
            src={require('../assets/icons/back.png')}/>,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.font.ARIAL_BOLD,
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          
          }}/> 

        <dashboard.Screen
          name='DoctorClick' component={DoctorClick} 
          options={{
            title: 'Appointment',
            headerStyle: {
              backgroundColor: theme.color.light_blue,
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
            headerBackImage: ()=> <Pic
            src={require('../assets/icons/back.png')}/>,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.font.ARIAL_BOLD,
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          
          }}/> 

        <dashboard.Screen
          name='Emergency' component={Emergency} 
          options={{ title: 'Emergency', headerShown: false}} />

        <dashboard.Screen
          name='HealthTips' component={HealthTips} 
          options={{ title: 'Health Tips'}} />

        <dashboard.Screen
          name='MedicineReminder' component={MedicineReminder} 
          options={{ title: 'Medicine Reminder'}} />
        
        <dashboard.Screen
          name='Notifications' component={Notifications} 
          options={{ title: 'Notifications'}} />

     </dashboard.Navigator>
     
     {!homebtn ?<View center middle style={styles.home_style}>
        <Pic src={require('../assets/images/Home.png')} t_style={styles.home } touchable press={()=>navigationRef.current?.navigate('Dashboard')} width={80} />
     </View> : null}
   </NavigationContainer>
 );
}

export default Navigation;

const styles = StyleSheet.create({
home_style: {
  width : theme.size.width,
  height: theme.size.height * 0.07,
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'transparent',
  borderTopColor: '#C1C1C1',
  borderWidth: 0.5
},
home: {
  top: -25,
},
input:{
  height: 40, 
  fontSize: 17,
  },
  input_view:{
  paddingHorizontal: 25,
  width: theme.size.width * .8,
  height: theme.size.height * 0.05,
  backgroundColor:'white',
  borderRadius: 5,
  },
  search_icon:{
    height: theme.size.height * .07,
    width: theme.size.width * .07,
  }
})