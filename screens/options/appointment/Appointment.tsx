import React,{useEffect, useRef, useState} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../../../constants';
import {createStore} from 'redux';
import {useDispatch} from 'react-redux';
import {Hospital, Clinic} from '../../../screens';
import {StyleSheet, Keyboard} from 'react-native';
import { Pic, View, Text, Input, List, Button} from '../../../components';
import { firebase_get_collection, firebase_search } from '../../../database/Firebase';
import { updateCliniclDepartment, updateHospitalDepartment } from '../../../brain/redux/actions/appointment.actions';


const appointment = createMaterialTopTabNavigator();
let placeholder_hospital = "Search for Hospital"
let placeholder_clinic = "Search for Clinic"
let status = true;

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


  const [ seach, setSearch ] = useState(false);
  const [ data, setData] = useState([]);
  const [ refresh, setRefresh ] = useState(true);
  const dispatch = useDispatch();
  

  useEffect(()=>{
    const keyboardListenerHide = Keyboard.addListener('keyboardDidHide', ()=>{
      setSearch(false);
    });
    return () => { keyboardListenerHide.remove()}
  },[])
  function SearchItems(){
    return(  
      <View shadow={box_shadow_search} white paddingVertical={10}>
        <List
          data={data}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps={'always'} 
          renderItem={({index, item})=>  
            <View flex={false} borderColor='rgba(196,196,196,0.2)' borderTopWidth={index == 0 ? 1: 0 } borderBottomWidth={1}>  
                <View touchable style={{flex:1, paddingVertical: 5, zIndex:100}} middle press={()=>{
                  
                   setSearch(false);
                   if(status){
                     placeholder_hospital = item.name
                    dispatch(updateHospitalDepartment(item))
                   }
                   else{
                    placeholder_clinic = item.name
                    dispatch(updateCliniclDepartment(item))
                   }
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
                              placeholder={ status ? placeholder_hospital : placeholder_clinic}
                              autoFocus={true}
                              placeholderStyle={{fontFamily: theme.font.AVARAGE_SANS_REGULAR, fontSize: 20}}
                              style={[styles.input, {width: '100%',}]}
                              onChangeText={text => {
                                console.log(text.toLowerCase());
                                
                                firebase_search(status ? 'Hospitals' : 'Clinics',text.toLowerCase()).then((data: any)=>{
                                    setData(data)
                                    console.log(data);
                                    if(data == undefined)
                                      setSearch(false)
                                    else if(data.length != 0)
                                      setSearch(true);
                                    else if(data.length == 0)
                                      setSearch(false);
                                    
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
                    if(status){
                      status = false
                      setRefresh(status)
                    }
                  }
                  }}
                />
                <appointment.Screen name="Clinic" component={Clinic} 
                  
                  listeners={{
                  blur: e => {
                    if(!status){
                      status = true
                      setRefresh(status)
                    }
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