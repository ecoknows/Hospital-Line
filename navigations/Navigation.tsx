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
import { firebase_get_collection, firebase_search } from '../database/Firebase';
import Appointment from '../screens/options/appointment/Appointment';

  
const dashboard = createStackNavigator();
const appointment = createMaterialTopTabNavigator();

/*
function AppointmentTopTab({navigation}){

  const box_shadow = {
    width: theme.size.width * .8,
    height: theme.size.height * .05,
    color:"#000",
    border:5,
    radius:5,
    opacity:0.1,
    x:1,
    y:2,
  }

  const box_shadow_search = {
    width: theme.size.width * .8,
    height: theme.size.height * .3,
    color:"#000",
    border:5,
    radius:5,
    opacity:0.1,
    x:1,
    y:2,
    style: {position:'absolute', alignSelf: 'center', zIndex: 1, marginTop: theme.size.height * .055}
  }

  const [ department, setDepartment] = useState(null);
  const [ seach, setSearch ] = useState(false);
  const [data, setData] = useState([]);
  const [ status, setStatus ] = useState("Hospitals");

  
  
  useEffect(()=>{
    const keyboardListenerShow = Keyboard.addListener('keyboardDidShow', ()=>{
        setSearch(true);
    });
    
    return () => {keyboardListenerShow.remove()}
  },[])

  useEffect(()=>{
    firebase_get_collection(status).then((data:any)=>setData(data));
  },[status])
  

  function SearchItems(){
    return(  
      <View shadow={box_shadow_search} white paddingVertical={10}>
        <List
          data={data}
          renderItem={({index, item})=>  
            <View flex={false} borderColor='rgba(196,196,196,0.2)' borderTopWidth={index == 0 ? 1: 0 } borderBottomWidth={1}>  
                <View touchable style={{flex:1, paddingVertical: 5}} middle press={()=>{
                  
                   setSearch(false);
                   setDepartment(item);
                   
                }}>  
                  <Text avarage_sans gray size={18} >{item.name}</Text>
                </View>
            </View>
          }
          
           keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
  


  return (
    <View>
      <View flex={false} middle  light_blue paddingBottom={20}>
        <View shadow={box_shadow} flex={false} >  
         <View row white middle center flex={false}  style={styles.input_view}>
               <Input
                        placeholder={ department != null ? department.name : 'Search for '+ status}
                        autoFocus={true}
                        placeholderStyle={{fontFamily: theme.font.AVARAGE_SANS_REGULAR, fontSize: 20}}
                        style={[styles.input, {width: '100%',}]}
                        onChangeText={text => {
                          firebase_search(status,text.toLowerCase()).then((data: any)=>{
                              setData(data)
                          })
  
                      }}
                />   

            <View flex={false} absolute right={10}>  
              <Pic
                src={require('../assets/icons/search_blue.png')}
                style={styles.search_icon}
                touchable
              />
            </View>
         </View>
        </View>
      </View>
          { seach ? <SearchItems/>: null}
        <appointment.Navigator 
        
        tabBarOptions={{
          style: { elevation: 0, shadowOpacity: 0, borderBottomColor: '#C4C4C4', borderBottomWidth: 0.5,
          },
          labelStyle: { fontSize: 16, fontFamily: theme.font.ARIAL_BOLD},
          activeTintColor: '#614FB2'
        }}>
          <appointment.Screen name="Hospital" 
          listeners={{
            blur: e => {
              setStatus('Clinics')
            }
            }}
          >
            
            {props => <Hospital department={department} {...props} />}
          </appointment.Screen>
          <appointment.Screen name="Clinic" component={Clinic} 
            
            listeners={{
            blur: e => {
              setStatus('Hospitals')
                
            }
            }}/>
        </appointment.Navigator>
    </View>
  );
}*/

function Navigation(){
  
  const navigationRef = useRef(null);
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
     
     <View center middle style={styles.home_style}>
        <Pic src={require('../assets/images/Home.png')} t_style={styles.home } touchable press={()=>navigationRef.current?.navigate('Dashboard')} width={80} />
     </View>
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