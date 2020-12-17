import React, { useRef } from 'react';
import { StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import { Pic, View, Text, List, Input, Button } from '../../../components';
import { theme } from '../../../constants';

const { width, height } = Dimensions.get('window');

const title_shadow = {
    width: width * .17,
    height: height * .08,
    color:"#000",
    border:17,
    radius:30,
    opacity:0.4,
    x:11,
    y:15,
    style:{
        marginRight: 40,
        marginBottom: 40,
    }
}

const test_data = [
    {time: '3:00', ampm: 'PM', color: '#61C3FF',textColor:'white'},
    {time: '3:20', ampm: 'PM', color: 'white',textColor:'black'},
    {time: '3:50', ampm: 'PM', color: 'white',textColor:'black'},
    {time: '4:00', ampm: 'PM', color: 'white',textColor:'black'},
    {time: '4:20', ampm: 'PM', color: '#06D08A',textColor:'white'},
    {time: '4:50', ampm: 'PM', color: 'white',textColor:'black'},
    {time: '5:00', ampm: 'PM', color: 'white',textColor:'black'},
    {time: '5:20', ampm: 'PM', color: '#3B58B5',textColor:'white'},
    {time: '5:50', ampm: 'PM', color: '#1DA6FD',textColor:'white'},
]

function Main({navigation}){
    const anim = useRef( new Animated.Value(height * .55)).current;

    const openBottom =()=> {
        Animated.timing(anim,{
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }
    return(
        <View white paddingHorizontal={theme.size.padding * 4} paddingTop={theme.size.padding * 4}>
            <View center middle row flex={false}>
                <Pic
                    style={styles.dp}
                    src={require('../../../assets/icons/default_dp_large.png')}
                />
                <View marginLeft={theme.size.margin * 3}>
                    <Text avarage_sans style={styles.name}>Dr. Sandy Lapuz</Text>
                    <Text avarage_sans style={styles.specialty}>Dentist (Specialist)</Text>
                </View>
            </View>

            <View flex={false} row marginTop={theme.size.padding * 4}>
                <View center middle style={styles.box}>
                    <Text avarage_sans style={styles.date}>Sunday</Text>
                </View>
                <View  center middle style={styles.box}>
                    <Text avarage_sans style={styles.date}>Monday</Text>
                </View>
            </View>

            <View middle paddingTop={theme.size.padding * 2}>
                <Text roboto style={{fontSize: 17, marginVertical: theme.size.margin * 5, color:'#2B2B2B'}}>Pick a time</Text>

                <List
                    data={test_data}
                    numColumns={3}
                    contentContainerStyle={{paddingLeft: 5, paddingTop: 5}}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem={({item,index})=>
                    <View flex={false} touchable shadow={title_shadow} center middle style={styles.circle} backgroundColor={item.color}
                        press={()=>openBottom()}
                    >
                        <Text avarage_sans style={{color: item.textColor}}>{item.time}</Text>
                        <Text avarage_sans style={{color: item.textColor}}>{item.ampm}</Text>
                    </View>
                    }
                />
            </View>
            <BottomClick anim={anim} />
        </View>
    )
}

function BottomClick(props){
    const { anim } = props
    
    const closeBottom =()=> {
        Animated.timing(anim,{
            toValue: height * .55,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }

    return(
        <View animated style={[styles.time_click,
            {transform: [{
                translateY: anim,
            }]}
        ]}>

            <View touchable flex={false} center middle style={styles.close_btn}
                press={()=>closeBottom()}
            >
                <Pic
                src={require('../../../assets/icons/down_arrow.png')}/>
            </View>

            <Input
                    placeholder="Enter your name"
                    style={styles.in_name}
                />

            <Input
                placeholder="Enter your phone number"
                style={styles.in_phone}
            />
            <View row center marginTop={theme.size.margin*7 }> 
            
                <Button style={styles.cncl_btn}>
                    <Text open_sans style={{fontSize: 18}}>Cancel</Text>
                </Button>
                <Button style={styles.book_btn}>
                    <Text open_sans style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Book</Text>
                </Button>

            </View>
        </View>
    )
}

export default Main;

const styles = StyleSheet.create({
    dp: {
        borderRadius: 40,
        resizeMode:'cover',
        borderWidth: 2,
        borderColor: theme.color.purple,
    },
    date:{
        fontSize: 15,
        color: '#1DA6FD'
    },
    name:{
        fontSize: 18,
    },
    specialty:{
        fontSize: 14,
        color: '#686868',
    },
    box:{
        borderWidth: 0.5,
        borderColor: '#1DA6FD',
        paddingVertical: 10,
    },
    circle: {
        height : 83,
        width : 83,
        borderRadius: 100,
    },
    time_click: {
        position: 'absolute',
        height : height * .55,
        width,
        backgroundColor: theme.color.accent,
        bottom: 0,
        paddingHorizontal: 40,
    },
    close_btn:{
        height: 45,
        width: 80,
        backgroundColor:'white',
        borderBottomEndRadius: 40,
        borderBottomStartRadius: 40,
        alignSelf: 'center'
    },
    in_name: {
        backgroundColor: 'white', 
        height: 50, 
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 40,
        fontFamily: theme.font.AVARAGE_SANS_REGULAR,
        fontSize: 17,
    },
    in_phone: {
        backgroundColor: 'white', 
        height: 50, 
        borderRadius: 10,
        textAlign: 'center',
        marginTop: theme.size.margin * 5,
        fontFamily: theme.font.AVARAGE_SANS_REGULAR,
        fontSize: 17,
        marginBottom: 15,
    },
    cncl_btn:{
        backgroundColor: 'white',
        marginRight: 20,
        height: 38,
        width: 106,
    },
    book_btn: {
        backgroundColor: '#3B58B5',
        height: 38,
        width: 106,
    }
});