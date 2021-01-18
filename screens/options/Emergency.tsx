import React, { useEffect } from 'react';
import {Pic, Text, View } from '../../components';
import { theme } from '../../constants';
import Map from '../Map';
import {useDispatch} from 'react-redux';
import { updateHomeBtn } from '../../brain/redux';
import { BackHandler } from 'react-native';

export default function Emergency({navigation}){
  const dispatch = useDispatch();
  useEffect(()=>{
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', function () {
      dispatch(updateHomeBtn(false))  
      return false;
    });
    return () => backHandler.remove();
  },[])
  dispatch(updateHomeBtn(true))  
  return(
    <View >
      <Map/>
      <View touchable flex={false} style={{position: 'absolute' ,bottom: 5, alignSelf: 'center'}} press={()=>{
        navigation.navigate('Dashboard');
        dispatch(updateHomeBtn(false));
      }}>
        <Pic
          src={require('../../assets/icons/emergency_home.png')}
        />
      </View>
      
    </View>
  )
  
}