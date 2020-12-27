import React,{ useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import {api, compass} from "../brain";
import {Mark, AnimatedLine} from '../components';
import {theme} from '../constants';
import { firebase_get_nearest_map_coords } from "../database/Firebase";

const CARD_HEIGHT = 220;
const CARD_WIDTH = theme.size.width * 0.8;
let start = false;
let current_index = -1;
let user_pos = {latitude: 0, longitude: 0};
let map_pos = {
    latitude: 0, 
    longitude: 0,
    latitudeDelta: 0.0035,
    longitudeDelta: 0.0010
};


let compass_ = true;
function Main(){
    const [subscription, setSubscription] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [route, setRoute] = useState([]);
    const [places , setPlaces] = useState([]);

    let mapIndex = 0;
    const mapAnimation = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const rootViewAnim = useRef(new Animated.Value(0)).current;

    const _map = useRef(null);
    
    useEffect(()=>{
        MapAnimation({mapAnimation, setRoute , mapIndex, _map});
        GetLocation({refresh, setRefresh});
        if(compass_){

            compass.start( (result : any) =>{
            const { heading } = result;
            rotateAnim.setValue(heading);
            },{subscription, setSubscription});
        
            return () => {
            compass.remove({subscription, setSubscription});
            };
        }
    },[]);


    if(places.length == 0){
      GetNeareastHospital(100, setPlaces)
    }
    
    
    if(!start){
        return(
        <View>
            <Text>Loading Screen</Text>
        </View>
        )
    }

    return(
        <View>
        <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={map_pos}
        customMapStyle={theme.mapStyle}
        onRegionChange={() => {
          _map.current.getCamera()
          .then((info) => {

          let angle = info.heading  
          rootViewAnim.setValue(angle);
          compass_ = false;
          });
          }}
        >
            <User rotateAnim={rotateAnim} rootViewAnim={rootViewAnim}/>
            <Direction route={route}/>

            {places.map(
                    (item, index) => <Places key={index} index={index} item={item} setRoute={setRoute}/>
            )}
            
        </MapView>
          
        
        </View>
       
    );
}

//<Near_Places mapAnimation={mapAnimation} />
  

// BUILT IN METHODS

function User(props){
    const {rotateAnim, rootViewAnim} = props;
    return(
        <Mark
        user
        animated
        coordinate={user_pos}
        image={require('../assets/icons/User.png')}
        rootViewStyle={{
          transform: [{
            rotate: rootViewAnim.interpolate({
                inputRange: [0,360],
                outputRange: ['360deg','0deg'],
                extrapolate: 'clamp',
            })
            }]
        }}
        viewStyle={{ transform: [{
          rotate: rotateAnim.interpolate({
              inputRange: [0,360],
              outputRange: ['0deg','360deg'],
              extrapolate: 'clamp',
          })
          }]}}
        imageStyle={{
            resizeMode:'contain',
            width: 80,
            height: 80,   
           }}
        />
    )
}

function Places(props){
    const { item, setRoute} = props;
    const { geopoint } = item.position
    const { distance } = item.hitMetadata
    let dis = distance.toFixed(0) != 0 ? distance.toFixed(1) + ' km': (distance.toFixed(3) * 1000) + ' m'
    return(
        <Mark 
              coordinate={{latitude: geopoint.U, longitude: geopoint.k}}
              userPosition={{longitude: user_pos.longitude, latitude: user_pos.latitude}}
              image={require('../assets/icons/marker.png')}
              distance={dis}
              availability={item.availability}
              setRoute={setRoute}
              />
    );
}

function Direction(props){
    const { route } = props;
    
    return(
        <AnimatedLine
            coordinates={route}
            time={50}
          />
    );
}

function MapAnimation(props){
    let { mapAnimation, setRoute, mapIndex, _map} = props;
    mapAnimation.addListener(({value})=>{
        let index = Math.floor(value / CARD_WIDTH + 0.3 );
  
        if(index >= DATA.length){
          index = DATA.length - 1;
        }
        if(index < 0){
          index = 0;
        }
        
  
        if(current_index != index){
          current_index = index;
          clearTimeout(regionTimeout);
  
          const regionTimeout = setTimeout(()=>{
            if(mapIndex != index){
              mapIndex = index;
              const {coordinate} = DATA[index];
              _map.current.animateToRegion(
                {
                  ...coordinate,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                },  
                350,
              )
              api.route((result: [])=>{
                setRoute(result);
              },{ 
              fromCoordinates : {longitude: user_pos.longitude, latitude: user_pos.latitude}, 
              toCoordinates : {longitude: coordinate.longitude, latitude:coordinate.latitude} 
            })
            }
          },10);
  
        }
      });
}

function GetLocation(props){
    const { setRefresh, refresh } = props;

    navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
            
          map_pos = {
            ...map_pos,
            longitude,
            latitude,
            }
            
            user_pos = {
            longitude,
            latitude,
            }
        
            start = true;
            setRefresh(!refresh);
          },
        error => alert(error.message),
        { enableHighAccuracy: false, timeout: 20000, maximumAge: 1000 }
      )
        
}

function GetNeareastHospital(radius, setPlaces){
  if(user_pos.latitude != user_pos.longitude)
    firebase_get_nearest_map_coords((hits)=>{
      setPlaces(hits)
      
      
    },{
      center: {lat: user_pos.latitude, long: user_pos.longitude}, 
      radius: radius,
    });
}

export default Main;

const styles = StyleSheet.create({
    mapStyle: {
       width: theme.size.width,
       height: theme.size.height,
    },
    scrollView:{
      height : 50,
    },
    place: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      paddingVertical: 10,
    },
    item: {
      elevation: 2,
      backgroundColor: "#FFF",
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginHorizontal: 10,
      height: CARD_HEIGHT,
      width: CARD_WIDTH,
      overflow: "hidden",
      justifyContent: 'center',
      flexDirection: 'column'
    }
});