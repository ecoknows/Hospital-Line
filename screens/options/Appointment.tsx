import React,{useEffect, useRef, useState} from 'react';
import {Text, View, Pic } from '../../components';
import { theme } from '../../constants';
import { Dimensions, StyleSheet, Animated } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')

const title_shadow = {
    width: width * .34,
    height: height * .015,
    color:"#000",
    border:15,
    radius:3,
    opacity:0.2,
    x:20,
    y:28,
}
function Box(props) {
  const anim = useRef(new Animated.Value(0.5)).current;
  const color = anim.interpolate({
    inputRange: [0.5,1],
    outputRange: ['#C1C1C1',theme.color.light_blue],
    extrapolate: 'clamp'
  })
  const animStart =()=> {
    anim.setValue(1); 
    Animated.timing(anim, {
      toValue: 0.5,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }
  return(
      <View animated style={{borderColor: color, borderWidth: anim, paddingBottom: 60}}
        >
          
        <TouchableWithoutFeedback style={{height: '100%', width: '100%', marginTop: 30,}} onPress={animStart}>
          <Pic
            src={props.src}
            style={{alignSelf: 'center'}}
          />
          <View shadow={title_shadow} center middle flex={false} style={styles.title}>
            <Text avarage_sans semi_black>{props.children}</Text>
          </View>
        </TouchableWithoutFeedback>
       
      </View>
  )
}

function Main({navigation}){
 

  return (
    <View paddingHorizontal={15} white>
      <View scroll style={{paddingBottom: 100, marginTop: 20}}>
        
          <View row >
            <Box src={require('../../assets/icons/gynecology.png')} >Gynecology</Box>
            <Box src={require('../../assets/icons/Gastroenterology.png')} >Gastroenterology</Box>
          </View>
          
          <View row>
            <Box src={require('../../assets/icons/tooth.png')}>Dental</Box>
            <Box src={require('../../assets/icons/Orthopedic.png')}>Orthopedic</Box>
          </View>

          <View row>
            <Box src={require('../../assets/icons/General_Medicine.png')}>General Medicine</Box>
            <Box src={require('../../assets/icons/Pediatrician.png')}>Pediatrician</Box>
          </View>

          <View row>
            <Box src={require('../../assets/icons/cake.png')}>Skin</Box>
            <Box src={require('../../assets/icons/heart.png')}>Heart</Box>
          </View>

      </View>

      <View center middle style={[{backgroundColor: 'white', }, theme.home_style]}>
        
      <Pic src={require('../../assets/images/Home.png')} style={theme.home } touchable press={()=>navigation.navigate('Dashboard')} width={80} />
 
      </View>


    </View>
  )  
}

export default Main;

const styles = StyleSheet.create({
  title: {
    marginTop: 15,
    backgroundColor: '#ECEBEB',
    width: width * .4,
    height: height * .04,
    marginLeft: 10,
  },
  home_style: {
    width,
    height: height * 0.07,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderTopColor: '#C1C1C1',
    borderWidth: 0.5
  },
  home: {
    top: -25,
  }
})



