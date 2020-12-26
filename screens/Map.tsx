import React,{ useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import {api, compass} from "../brain";
import {Mark, AnimatedLine} from '../components';
import {theme} from '../constants';



const { width,height } = Dimensions.get('window');
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const DATA = theme.testing_data;
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

    let mapIndex = 0;
    const mapAnimation = useRef(new Animated.Value(0)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const rootViewAnim = useRef(new Animated.Value(0)).current;

    const _map = useRef(null);
    const interpolations = DATA.map((item, index)=>{
        const inputRange = [
        (index - 1) * CARD_WIDTH,
        index * CARD_WIDTH,
        ((index+1) * CARD_WIDTH),
        ];

        const scale = mapAnimation.interpolate({
        inputRange,
        outputRange:[1,1.3,1],
        extrapolate: 'clamp',
        });

        return {scale};
    });

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
            {DATA.map(
                    (item, index) => <Places key={index} index={index} item={item} interpolations={interpolations}  setRoute={setRoute}/>
            )}
            
        </MapView>
            
        <Marker
        coordinate={ {latitude: 14.6093263, longitude: 120.9717062}}
        
        
        />
        
        </View>
       
    );
}

//<Near_Places mapAnimation={mapAnimation} />


// BUILT IN METHODS
function Near_Places(props){
    const { mapAnimation } = props;
    return(
        <Animated.FlatList
        data={DATA}
        style={styles.place}
        renderItem={({item})=>
        <View style={styles.item}>
          <Image source={item.image} style={{
            resizeMode: 'contain',
            flex: 1,
            alignSelf:'center',
          }} />

          <Text style={{color:'#808080', alignSelf:'center',}}>{item.place}</Text>
        </View>}
        horizontal
        keyExtractor={ (item) => item.place}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}

        onScroll={Animated.event([{
            nativeEvent: {
              contentOffset:{
                x: mapAnimation,
              }
            }
        }],
          {useNativeDriver: true}
          )}

      />
    )
}
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
              outputRange: ['360deg','0deg'],
              extrapolate: 'clamp',
          })
          }]}}
        imageStyle={{
            resizeMode:'contain',
            width: 60,
            height: 60,   
           }}
        />
    )
}

function Places(props){
    const { item, index, interpolations, setRoute} = props;

    const scaleStyle = {
        transform : [
        {
            scale: interpolations[index].scale,
        }
        ]
    }
    return(
        <Mark 
              animated
              percentage={item.percentage}
              coordinate={item.coordinate}
              userPosition={{longitude: user_pos.longitude, latitude: user_pos.latitude}}
              image={require('../assets/icons/marker.png')}
              viewStyle={[scaleStyle]}
              percentageStyle={{color: item.color}}
              setRoute={setRoute}
              >
  
                <Text>{item.place}</Text>
  
        </Mark>
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

export default Main;

const styles = StyleSheet.create({
    mapStyle: {
       width,
       height,
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