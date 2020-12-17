import React,{useEffect, useRef, useState} from 'react';
import {Text, View, Pic, List } from '../../../components';
import { theme } from '../../../constants';
import { Dimensions, StyleSheet, Animated,TouchableWithoutFeedback } from 'react-native';
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
const options = [
  {title: 'Gynecology' , image: require('../../../assets/icons/gynecology.png')},
  {title: 'Gastroenterology' , image: require('../../../assets/icons/Gastroenterology.png')},
  {title: 'toot' , image: require('../../../assets/icons/tooth.png')},
  {title: 'Orthopedic' , image: require('../../../assets/icons/Orthopedic.png')},
  {title: 'General Medicine' , image: require('../../../assets/icons/General_Medicine.png')},
  {title: 'Pediatrician' , image: require('../../../assets/icons/Pediatrician.png')},
  {title: 'cake' , image: require('../../../assets/icons/cake.png')},
  {title: 'heart' , image: require('../../../assets/icons/heart.png')},
]

function Main({navigation}){
 

  const Box = props => {
    const anim = useRef(new Animated.Value(0.5)).current;
    const color = anim.interpolate({
      inputRange: [0.5,1],
      outputRange: ['rgba(218,218,218,0.45)',theme.color.light_blue],
      extrapolate: 'clamp'
    })
    const animStart =()=> {
      anim.setValue(1); 
      Animated.timing(anim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: false,
      }).start(({ finished }) => {
        navigation.navigate('DoctorList');
      });
  
    }
    return(
        <View animated style={{borderColor: color, borderWidth: anim, paddingBottom: 60}}
          >
            
          <TouchableWithoutFeedback style={{height: '100%', width: '100%', marginTop: 30,}} onPress={animStart}
          >
            <View marginTop={30}>
              <Pic
                src={props.src}
                style={{alignSelf: 'center'}}
              />
              <View shadow={title_shadow} center middle flex={false} style={styles.title}>
                <Text avarage_sans semi_black>{props.children}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
         
        </View>
    )
  }

  return (
    <View paddingHorizontal={15} white>
      <List
        numColumns={2}
        data={options}
        renderItem={({item}) =>  <Box src={item.image} >{item.title}</Box>}
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
    marginTop: 15,
    backgroundColor: '#ECEBEB',
    width: width * .4,
    height: height * .04,
    marginLeft: 10,
  },
})



