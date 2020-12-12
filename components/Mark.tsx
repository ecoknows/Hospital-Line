import React from "react";
import { View, Image, Text, Animated } from "react-native";
import { Callout, Marker } from "react-native-maps";
import API from "../brain/API";



export default function Main(props : any){
    
    const {
      coordinate, 
      userPosition,
      setRoute,
      children,
      image, 
      percentage, 
      imageStyle, 
      animated,
      user,
      viewStyle,
      rootViewStyle, 
      percentageStyle} = props;

    if(user){
      return(
        <Marker
        coordinate={coordinate}
        onPress={()=>marker_on_press(coordinate,setRoute, userPosition)}
        >
        <Animated.View style={rootViewStyle}>

         <Animated.View style={viewStyle}>
            <Image source={image}
                  style={[{
                    resizeMode: 'contain',
                    width: 50,
                    height: 50,
                    top: -10,
                  },imageStyle]}/>
            </Animated.View>
        </Animated.View>
        </Marker>
      )
    }else{
      return(
          <Marker
          coordinate={coordinate}
          onPress={()=>marker_on_press(coordinate,setRoute, userPosition)}
          >
  
          
               <Animated.View style={[{flex: 1, zIndex:1},viewStyle]}>
                <Animated.Image source={image}
                  style={[{
                    resizeMode: 'contain',
                    width: 40,
                    height: 40,
                    margin: 10,
                  },imageStyle]}
                />
                <Text style={[{color: '#808080', position: "absolute", left: 23, top: 18, fontSize: 10},percentageStyle]}>{percentage}</Text>
              </Animated.View>
      
              <Callout>
                <View>
                  {children}
                </View>
              </Callout>
              
          </Marker>
      )
    }




}

function marker_on_press(coordinate : any,setRoute : any, userPosition : {longitude: number, latitude: number}){
    API.route((result: [])=>{
        setRoute(result);
      },{ 
      fromCoordinates : {longitude: userPosition.longitude, latitude: userPosition.latitude}, 
      toCoordinates : {longitude: coordinate.longitude, latitude:coordinate.latitude} 
    })
}