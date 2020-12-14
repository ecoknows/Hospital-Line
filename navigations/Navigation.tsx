import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { theme } from '../constants';
import {
  Appointment,
  Emergency,
  HealthTips,
  MedicineReminder,
  Notifications,
  Map,
  SplashScreen,
  Dashboard} from '../screens';
import { Route } from 'react-native';

  
const dashboard = createStackNavigator();

function Navigation(){
  return(
    <NavigationContainer>
      <dashboard.Navigator initialRouteName="SplashScreen" mode='modal'>
        <dashboard.Screen
          name='SplashScreen' component={SplashScreen} 
          options={{ title: 'Splash Screen', headerShown: false}} /> 

        <dashboard.Screen
          name='Dashboard' component={Dashboard} 
          options={{ title: 'Dashboard', headerShown: false}} />

        <dashboard.Screen
          name='Emergency' component={Emergency} 
          options={{ title: 'Emergency'}} />

        <dashboard.Screen
          name='Appointment' component={Appointment} 
          options={{ title: 'Appointment'}} />

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
   </NavigationContainer>
 );
}

 export default Navigation;