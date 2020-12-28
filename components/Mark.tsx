import React from "react";
import { Image, StyleSheet, Animated } from "react-native";
import { Callout, Marker } from "react-native-maps";
import Pic from './Pic';
import View from './View';
import {api} from "../brain";
import { theme } from "../constants";
import Circle from './Circle';
import Text from './Text';



const markShadow = {
  height: theme.size.height *.04,
  width: theme.size.width * .1,
  color:"#000",
  border: 15,
  radius: 14,
  opacity:0.15,
  x: 11.5,
  y: 24.5,
  style:{ alignSelf: 'center', marginRight: 20, marginTop: 15}
}

const practiceShadow = {
  height: theme.size.height *.137,
  width: theme.size.width * .44,
  color:"#000",
  border:5,
  radius: 16,
  opacity:0.15,
  x: 3,
  y: 3,
  style:{ alignSelf: 'center'}
}
export default function Main(props : any){
    
    const {
      coordinate, 
      userPosition,
      setRoute,
      children,
      image, 
      imageStyle, 
      user,
      viewStyle,
      rootViewStyle, 
      distance,
      availability,
    } = props;

    if(user){
      return(
        <Marker
        coordinate={coordinate}
        anchor={{ x: 0.5, y: .6 }}
        onPress={()=>marker_on_press(coordinate,setRoute, userPosition)}
        >
           <Animated.View style={rootViewStyle} >

         <Animated.View style={viewStyle}>
            <Image source={image}
                  style={[{
                    resizeMode: 'contain',
                    width: 50,
                    height: 50,
                  },imageStyle]}/>
            </Animated.View>
        </Animated.View>
        </Marker>
      )
    }else{
      let stat = 'Full';
      let stat_color = 'red';
      if(availability == 1){
        stat = 'Available';
        stat_color = '#07FF4C';
      }else if (availability == 2){
        stat_color = '#F3AF00';
        stat = 'Available';
      }
      return(
          <Marker
          coordinate={coordinate}
          anchor={{ x: 0.5, y: 0.96 }}
          style={{height: theme.size.height *.25,
            paddingLeft: 6,
          width: theme.size.width * .5}}
          onPress={()=>marker_on_press(coordinate,setRoute, userPosition)}
          >
             <View shadow={practiceShadow}>
              <View style={styles.callout}>
                <View flex={false} row marginLeft={theme.size.padding+4} marginBottom={theme.size.margin*2}>
                  <Circle backgroundColor={stat_color} round={10} alignSelf='center' marginRight={theme.size.margin} />
                  <Text roboto size={15}>{stat}</Text>
                </View>
                <View flex={false} row  marginLeft={theme.size.padding+4} marginBottom={theme.size.margin*2}>
                  <Pic 
                    src={require('../assets/icons/km.png')}
                    style={{alignSelf:'center',marginRight:theme.size.margin}}
                  />
                  <Text roboto color='#817F7F' size={15}>{distance}</Text>
                </View>
                <View borderColor='#E6E6E7' borderTopWidth={1}>
                  <View flex={false} row center middle paddingTop={5}marginBottom={theme.size.margin*2}>
                    <Pic 
                      src={require('../assets/icons/compass.png')}
                      style={{alignSelf:'center',marginRight:theme.size.margin}}
                    />
                    <Text roboto color='#053E92' size={16}>Get Directions</Text>
                  </View>
                </View>
                <Pic
                  src={require('../assets/icons/arr_indicator.png')}
                  style={{position:'absolute', bottom: -20, alignSelf:'center'}}
                />
            </View>

         </View>
                <View shadow={markShadow} flex={false}>
                    <Pic 
                        src={require('../assets/testing/lukes.jpg')}
                        style={styles.image}
                    />  
                    <Pic 
                        src={require('../assets/icons/open.png')}
                        style={styles.icon}
                    />
                   <View flex={false} style={styles.triangle}/>
                </View>
          </Marker>
      )
    }




}

function marker_on_press(coordinate : any,setRoute : any, userPosition : {longitude: number, latitude: number}){
    
    api.route((result: [])=>{
        setRoute(result);
        console.log('eco');
        
      },{ 
      fromCoordinates : {longitude: userPosition.longitude, latitude: userPosition.latitude}, 
      toCoordinates : {longitude: coordinate.longitude, latitude:coordinate.latitude} 
    })
}

const styles = StyleSheet.create({
 
  image: {
    width: '162%',
    height: '140%',
    borderRadius: 600,
    borderWidth: 5.6,
    transform: [{ scaleX: 1.15 }],
    borderColor: 'white',
    resizeMode: 'cover'
  },
  icon:{
    position: 'absolute',
    bottom: -17,
    right: -21,
  },
  triangle: {
    position: 'absolute',
    bottom: -25,
    left: 25,
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "white",
    transform: [{ rotate: "180deg" }],
  },
  check:{
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 15/2,
    backgroundColor:'#00C637'
  },
  callout:{
    paddingVertical:theme.size.padding+4,
    height: '100%',
    width: '104%',
    borderRadius: 20,
    backgroundColor: 'white'
  }
});