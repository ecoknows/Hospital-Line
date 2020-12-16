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
import {StyleSheet} from 'react-native';
import { Pic } from '../components';

  
const dashboard = createStackNavigator();

function Navigation(){
  return(
    <NavigationContainer>
      <dashboard.Navigator initialRouteName="Dashboard" mode='modal'>
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
          options={({navigation}) => ({
            title: 'Departments',
            headerStyle: {
              backgroundColor: theme.color.light_blue,
            },
            headerLeft: ()=>
            <Pic
            touchable 
            press={()=> navigation.goBack()}
            style={styles.back_icon}
            src={require('../assets/icons/back.png')}/>,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.font.ARIAL_BOLD,
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          
          })}
          />

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

 const styles = StyleSheet.create({
   back_icon: {
     resizeMode: 'contain',
     marginLeft: theme.size.margin*3,
   }
 })