import React,{useEffect, useRef, useState} from 'react';
import {Text, View, Pic, List } from '../../../components';
import { theme } from '../../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../brain/redux/reducers';
import { Dimensions, StyleSheet, Animated,TouchableWithoutFeedback } from 'react-native';

const title_shadow = {
    width: theme.size.width * .34,
    height: theme.size.height * .04,
    color:"#000",
    border:3,
    radius:3,
    opacity:0.1,
    x:11,
    y:1.5,
    style:{marginLeft: 12}
}

const box_shadow = {
  width: theme.size.width * .46,
  height: theme.size.height * .201,
  color:"#000",
  border:5,
  radius:13,
  opacity:0.1,
  x:1,
  y:1,
  style:{marginLeft: 6}
}
/*
const options = [
  {title: 'Gynecology' , image: require('../../../assets/icons/gynecology.png')},
  {title: 'Gastroenterology' , image: require('../../../assets/icons/Gastroenterology.png')},
  {title: 'Dental' , image: require('../../../assets/icons/tooth.png')},
  {title: 'Orthopedic' , image: require('../../../assets/icons/Orthopedic.png')},
  {title: 'General Medicine' , image: require('../../../assets/icons/General_Medicine.png')},
  {title: 'Pediatrician' , image: require('../../../assets/icons/Pediatrician.png')},
  {title: 'cake' , image: require('../../../assets/icons/cake.png')},
  {title: 'heart' , image: require('../../../assets/icons/heart.png')},
]*/
function Main({navigation}){
  const { hospital } = useSelector((state: RootState) => state.hospital)

  let data: {image : number, title : string}[] = [];
  if(hospital.departments != null){
    const arr = hospital.departments;
    for(let i = 0; i < arr.length; i++){
      data.push(theme.departments[arr[i]]);
    }
  }
  
  const BoxShadow = props => {
    const anim = useRef(new Animated.Value(0)).current;
    const color = anim.interpolate({
      inputRange: [0,1],
      outputRange: ['white',theme.color.light_blue],
      extrapolate: 'clamp'
    })
    const animStart =()=> {
      anim.setValue(1); 
      Animated.timing(anim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(({ finished }) => {
        navigation.navigate('DoctorList');
      });
  
    }
    return(
        <View style={{paddingBottom: 24}}
          >
            <View shadow={box_shadow} style={[styles.box, {borderWidth: anim, borderColor: color}]} flex={false} animated>
      
              <TouchableWithoutFeedback style={{height: '100%', width: '100%', marginTop: 30,}} onPress={animStart}
              >
                <View center>
                  <Pic
                    src={props.src}
                    resizeMode='cover'
                    style={{alignSelf: 'center', width: theme.size.width * 0.14 ,height: theme.size.height * 0.10}}
                  />
                  <View shadow={title_shadow} center middle flex={false} style={styles.title}>
                    <Text avarage_sans semi_black>{props.children}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              
            </View>
        </View>
    )
  }

  return (
    <View white>
      <List
        numColumns={2}
        data={data}
        renderItem={({item}) =>  <BoxShadow src={item.image} >{item.title}</BoxShadow>}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 100, paddingTop: 20}}
      />

    </View>
  )  
}

export default Main;

const styles = StyleSheet.create({
  title: {
    backgroundColor: '#ECEBEB',
    width:'100%',
    height: '100%',
    marginLeft: 10,
  },
  box: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
})



