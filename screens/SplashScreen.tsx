import React, { useEffect, useRef, useState} from 'react';
import { Animated, StyleSheet} from 'react-native';
import { Button, Circle, Pic, Text, View } from '../components';
import { theme } from '../constants';
import Navigation from '../navigations/Navigation';

const screens = [
    {
        title: 'FIND NEAREST HOSPITAL',
        image: require('../assets/images/splash/hospital.png'),
        info: 'You can find available hospitals\njust one click away'
    },
    {
        title: 'BOOK AN APPOINTMENT',
        image: require('../assets/images/splash/appointment.png'),
        info: 'View all available time slots of a Doctor and make an appointment'
    },
    {
        title: 'SET MEDICINE REMINDER',
        image: require('../assets/images/splash/reminder.png'),
        info: 'You can schedule reminders\nfor taking a medicine'
    },
    {
        title: 'HEALTH TIPS',
        image: require('../assets/images/splash/tips.png'),
        info: ' Get timely advice and tips\nfor a healthy and happy life'
    }
]

function Main({navigation}){
    const proceed = () =>{
        navigation.navigate('Dashboard')
    }
    const [change, setChange] = useState(false);
    return(
        <View>
            { change ? <InfoScreen navigation={navigation}/> : <LogoScreen setChange={setChange}/>}
        </View>
    )
}


function LogoScreen(props){
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }).start();
    };

    const anim = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 5000,
                useNativeDriver: true,
            })
        ]).start(()=>{
            props.setChange(true);
        })
    }
    anim()

    return(
        <View animated center middle style={{opacity : fadeAnim}}>
            <Pic src={require('../assets/images/hospital_line.png')} marginBottom={theme.size.margin * 5} />
            <Text title gray>HOSPITAL <Text title light_blue>LINE</Text></Text>
        </View>
    )
}

function InfoScreen({navigation}){
   
    const [cnt, setCnt] = useState(0);
    const data = screens[cnt];

    const clicked =(num)=>{
        if (cnt == num)
            return styles.circle_clicked;
        return styles.circle;
    }

    const CircleNav =()=>{
        return(
            <View flex={1} center middle >
                <Circle round={12} style={clicked(0)}/>
                <Circle round={12} style={clicked(1)}/>
                <Circle round={12} style={clicked(2)}/>
                <Circle round={12} style={clicked(3)}/>

                <Pic touchable src={require('../assets/icons/arrow-bottom.png')} marginTop={theme.size.margin * 2}
                    press={()=> cnt < 3 ? setCnt(cnt+1) : setCnt(0)}
                />
            </View>
        )
    }
    
    return(
        <View paddingTop={theme.size.padding*4} paddingHorizontal={theme.size.padding *4}>
            <View flex={1}>
                
                <View  touchable press={() => navigation.navigate('Dashboard') } >
                <Text roboto gray normal size={theme.size.normal} style={styles.skip} >SKIP</Text>
                </View>
                <Text title gray style={styles.hosiptal_line}>HOSPITAL <Text title light_blue>LINE</Text></Text>

            </View>

            <View center middle flex={2} >
                <Pic src={data.image} flex={1}/>
            </View>

            <View center middle flex={1.5}  >
                <Text size={theme.size.title - 6} gray roboto_bold>{data.title}</Text>
                <Text size={theme.size.normal + 2} gray open_sans center>{data.info}</Text>
            </View>
            <View center middle flex={1}>
                {cnt != 3 ? <CircleNav/> : <Button onPress={() => navigation.navigate('Dashboard') }><Text size={19} white archivo_bold >Get Started</Text></Button> }
                
            </View>
        </View>
    )
}


export default Main;

const styles = StyleSheet.create({
    skip: {
        alignSelf:'flex-end',
        marginTop: theme.size.margin * 3,
    }, 
    hosiptal_line: {
        alignSelf: 'center',
        
    },
    circle: {
        borderWidth: 2,
        marginBottom: theme.size.margin,
        borderColor: theme.color.light_accent,
    },
    circle_clicked: {
        backgroundColor: theme.color.light_accent,
        marginBottom: theme.size.margin
    }
})



