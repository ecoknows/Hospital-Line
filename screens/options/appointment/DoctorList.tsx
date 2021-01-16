import React, {useRef, useLayoutEffect, useState, useEffect} from 'react';
import { StyleSheet, Dimensions,TouchableWithoutFeedback, Animated, Keyboard } from 'react-native';
import { View, Pic, List, Text, Input } from '../../../components';
import { theme } from '../../../constants';

const test_data = [
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
    {name: 'Dr. Sandy Lapuz', specialty: 'Dentist (Specialist)'},
]
const { width, height } = Dimensions.get('window');

const title_shadow = {
    width: width * .8,
    height: height * .052,
    color:"#000",
    border:4,
    radius:14,
    opacity:0.2,
    x:0,
    y:2,
	style:{
    position: 'absolute', 
    alignSelf:'center', 
    bottom: -height * 0.04,
    left: -width * 0.75,
    }
}
function Doctors(props){
    const { item, index, navigation } = props;
    
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
        navigation.navigate('DoctorClick');
      });
  
    }
    return(
        <View animated style={{borderColor: color, borderWidth: anim}} middle row backgroundColor={ index % 2 == 0 ? '#F3F3F3' : 'white'}>
           <TouchableWithoutFeedback onPress={animStart}>
                <View row middle paddingVertical={theme.size.padding * 2} paddingHorizontal={theme.size.padding * 3 - 4} >
                    <Pic 
                    src={require('../../../assets/icons/default_dp.png')}
                    style={styles.dp}
                    />
                    <View flex={false} marginLeft={theme.size.margin * 4}>
                        <Text avarage_sans style={styles.name}>{item.name}</Text>
                        <Text avarage_sans style={styles.specialty}>{item.specialty}</Text>
                    </View>
                    <Pic
                    src={require('../../../assets/icons/right_arrow.png')}
                    style={styles.right_arrow}/>
                </View>
           </TouchableWithoutFeedback>
           
        </View>
    )
}

function SearchBox(props){
    const anim = useRef(new Animated.Value(0)).current;

    const fadeAnim =()=>{
        Animated.timing(anim,{
            toValue: 1,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }

    fadeAnim();

    return( 
    <View animated style={{ opacity : anim, bottom: -5, position:'absolute'}} >
        <View shadow={title_shadow} row style={styles.search_input}>
            <Input
                    placeholder='Search Doctor'
                    autoFocus={true}
                    placeholderStyle={{fontFamily: theme.font.AVARAGE_SANS_REGULAR, fontSize: 20}}
                    style={styles.input}
            />   
            <Pic
            touchable
            t_style={{marginTop: 8}}
            src={require('../../../assets/icons/search_a.png')}/>
        </View> 
    </View>
    );
}

function Main({navigation}){
    const [is_search, setIs_search] = useState(false);

    useEffect(()=>{
        
        const keyboardListener = Keyboard.addListener('keyboardDidHide', ()=>{
            setIs_search(false);
        });
        return () => {keyboardListener.remove()}
    },[]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: ()=>
            <View flex={false}  style={styles.search} >
                <Pic
                touchable
                press={()=>{setIs_search(true);}}
                src={require('../../../assets/icons/search.png')}/>
                {is_search ? <SearchBox/> : null}               
            </View>,
        });
    },[navigation,is_search]);

    return(
        <View white paddingHorizontal={theme.size.padding *2} >
            <List
                showsVerticalScrollIndicator={false}
                data={test_data}
                renderItem={({item, index})=> <Doctors item={item} index={index} navigation={navigation}/>}
                keyExtractor={(item,index) => index.toString()}
                contentContainerStyle={{paddingTop: theme.size.padding * 2}}
            />
        </View>
    )
}

export default Main;

const styles = StyleSheet.create({
    dp:{
        borderRadius: 40,
        resizeMode:'cover',
        borderWidth: 2,
        borderColor: theme.color.light_blue,
    },
    right_arrow:{
        position: 'absolute',
        right: 20,
    },
    name:{
        fontSize: 18,
    },
    specialty:{
        fontSize: 14,
        color: '#686868',
    },
   search:{
    position: 'absolute',
    padding: theme.size.margin*3,
   },
   search_input:{
    
    paddingHorizontal: 20,
    width: width * .8,
    height: 100,
    borderRadius: 40,
    backgroundColor:'white',
   },
   input:{
    height: 40, 
    flex: 1,
    fontSize: 17,
   }
});