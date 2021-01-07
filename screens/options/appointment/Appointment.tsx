import React,{useEffect, useRef, useState} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../../../constants';
import {createStore} from 'redux';
import {useDispatch} from 'react-redux';
import {Hospital, Clinic} from '../../../screens';
import {StyleSheet, Keyboard} from 'react-native';
import { Pic, View, Text, Input, List} from '../../../components';
import { firebase_get_collection, firebase_search } from '../../../database/Firebase';
import { updateCliniclDepartment, updateHospitalDepartment } from '../../../brain/redux/actions/appointment.actions';


const appointment = createMaterialTopTabNavigator();

const Main = ({navigation}) => {
  
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

  const dispatch = useDispatch();

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
                   console.log(item , ' etaes');
                   
                   if(status == 'Hospitals')
                    dispatch(updateHospitalDepartment(item))
                   else
                    dispatch(updateCliniclDepartment(item))
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
                      src={require('../../../assets/icons/search_blue.png')}
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
                component={Hospital}
                listeners={{
                  blur: e => {
                    setStatus('Clinics')
                  }
                  }}
                />
                <appointment.Screen name="Clinic" component={Clinic} 
                  
                  listeners={{
                  blur: e => {
                    setStatus('Hospitals')
                      
                  }
                  }}/>
              </appointment.Navigator>
          </View>
    )
}


export default Main


const styles = StyleSheet.create({
    home_style: {
      width : theme.size.width,
      height: theme.size.height * 0.07,
      position: 'absolute',
      bottom: 0,
      backgroundColor: 'white',
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