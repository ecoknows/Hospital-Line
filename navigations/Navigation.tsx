import React,{useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { theme } from '../constants';
import {
  Appointment,
  Emergency,
  HealthTips,
  MedicineReminder,
  AddReminder,
  Notifications,
  Map,
  SplashScreen,
  Dashboard,
  DoctorList,
  DoctorClick,
} from '../screens';
import {Dimensions} from 'react-native';
import { Pic, View } from '../components';


  
const dashboard = createStackNavigator();

function Navigation(){
  
  const navigationRef = useRef(null);
  return(
    <NavigationContainer ref={navigationRef}>
      <dashboard.Navigator initialRouteName="Dashboard" mode='modal' screenOptions={{animationEnabled: false}}>
        <dashboard.Screen
          name='SplashScreen' component={SplashScreen} 
          options={{ title: 'Splash Screen', headerShown: false}} /> 

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
          options={{ title: 'Emergency'}} />
        
        <dashboard.Screen
          name='AddReminder' component={AddReminder} 
          options={{ title: 'Add Reminder', headerShown: false}} />

        <dashboard.Screen
          name='Appointment' component={Appointment} 
          options={({navigation}) => ({
            title: 'Departments',
            headerStyle: {
              backgroundColor: theme.color.light_blue,
              elevation: 0, // remove shadow on Android
              shadowOpacity: 0, // remove shadow on iOS
            },
            headerBackImage: ()=>
            <Pic
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
          options={{ 
            title: 'Medicine Reminder',
            headerStyle: {
            backgroundColor: theme.color.purple,

            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            },
            headerBackImage: ()=><Pic src={require('../assets/icons/back.png')}/>,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: theme.font.ARIAL_BOLD,
              fontWeight: 'bold'
            },
            headerTitleAlign: 'center'
          }} />
        
        <dashboard.Screen
          name='Notifications' component={Notifications} 
          options={{ title: 'Notifications'}} />

     </dashboard.Navigator>
     
     <View center middle style={theme.home_style}>
        <Pic src={require('../assets/images/Home.png')} t_style={theme.home } touchable press={()=>navigationRef.current.navigate('Dashboard')} width={80} />
     </View>
   </NavigationContainer>
 );
}

 export default Navigation;
