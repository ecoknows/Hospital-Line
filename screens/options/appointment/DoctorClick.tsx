import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import { Pic, View, Text, List, Input, Button } from '../../../components';
import { theme } from '../../../constants';
import { firebase_time_doctor_add_contact, firebase_time_doctor_info } from '../../../database/Firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../brain/redux';
import moment from 'moment';

const title_shadow = {
    width: theme.size.width * .17,
    height: theme.size.height * .08,
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

function Main({navigation, route}){
    const anim = useRef( new Animated.Value(theme.size.height * .55)).current;
    const { id ,firstname, lastname, middle_initial,department,date_available } = route.params;
    const name = "Dr. " + firstname + " "+ middle_initial + ". " + lastname;
    const [time_click, setTime_click] = useState('');
    const [time_data, setTimeData] = useState([]);
    const [dateSelected, setDateSelected] = useState(0)
    const { hospital } = useSelector((state: RootState) => state.hospital)
    useEffect(() => {
        firebase_time_doctor_info({
            hospital: hospital.id,
            department,
            date_available:date_available[dateSelected],
            doc_id: id,}).then((response: any)=>{
                setTimeData(response)
        })
    }, [dateSelected])

    const openBottom =(item)=> {
        Animated.timing(anim,{
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
        }).start(()=>{
            setTime_click(item.time)
        });
    }
    return(
        <View white paddingHorizontal={theme.size.padding * 4} paddingTop={theme.size.padding * 4}>
            <View center middle row flex={false}>
                <Pic
                    style={styles.dp}
                    src={require('../../../assets/icons/default_dp_large.png')}
                />
                <View marginLeft={theme.size.margin * 3}>
                    <Text avarage_sans style={styles.name}>{name}</Text>
                    <Text avarage_sans style={styles.specialty}>Dentist (Specialist)</Text>
                </View>
            </View>

            <List
                data={date_available}
                horizontal
                style={{
                    flexGrow:0,
                    marginTop: theme.size.padding * 4,
                    width: '100%',

                }}
                contentContainerStyle={{paddingLeft: date_available.length == 1 ?'25%' : 0}}
                keyExtractor={(item,index)=>index.toString()}
                renderItem={({item,index})=>
                        <View touchable center middle style={ index == dateSelected ? styles.box_select : styles.box}
                        
                        press={()=>setDateSelected(index)}
                        >
                            <Text avarage_sans style={index == dateSelected ? styles.date_select : styles.date}>{item}</Text>
                        </View>
                }   
            />

            <View middle paddingTop={theme.size.padding * 2}>
                <Text roboto style={{fontSize: 17, marginVertical: theme.size.margin * 5, color:'#2B2B2B'}}>Pick a time</Text>

                <List
                    data={time_data}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingLeft: 5, paddingTop: 5}}
                    keyExtractor={(item, index)=> index.toString()}
                    renderItem={({item,index})=>
                    <View flex={false} touchable shadow={title_shadow} center middle style={styles.circle} 
                    backgroundColor= {item.availability ? '#1DA6FD': 'white'}
                        press={()=>openBottom(item)}
                    >
                        <Text avarage_sans style={{color: item.availability ? 'white': 'black'}}>{moment(item.time, 'HH:mm').format('h:mm')}</Text>
                        <Text avarage_sans style={{color: item.availability ? 'white': 'black'}}>{moment(item.time, 'HH:mm').format('A')}</Text>
                    </View>
                    }
                />
            </View>
            <BottomClick anim={anim} time_click={time_click} 
                book_needed={
                    {
                        hospital: hospital.id, 
                        department,
                        date_available: date_available[dateSelected], 
                        doc_id: id,
                    }
                }
                    
            />
        </View>
    )
}

function BottomClick(props){
    const { anim, time_click,book_needed} = props
    const { hospital, department,date_available, doc_id} = book_needed
    const [contact, setContact] = useState('')
    const [name, setName] = useState('')
    
    const closeBottom =()=> {
        Animated.timing(anim,{
            toValue: theme.size.height * .55,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }

    const book =()=> {
        firebase_time_doctor_add_contact({
            hospital,
            department,
            date_available,
            doc_id,
            time_click
        },{contact,name});
        closeBottom()
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

            <View row center middle flex={false}>
                <Pic
                    src={require('../../../assets/icons/clock.png')}
                    style={{marginRight: theme.size.margin*2}}
                />
                <Text avarage_sans fontSize={18} white>The time you picked is {time_click}</Text>
            </View>

            <Input
                    placeholder="Enter your name"
                    style={styles.in_name}
                    value={name}
                    onChangeText={text => setName(text)}
                />

            <Input
                placeholder="Enter your phone number"
                style={styles.in_phone}
                value={contact}
                onChangeText={text => setContact(text)}
            />
            <View row center marginTop={theme.size.margin*7 }> 
            
                <Button style={styles.cncl_btn} press={closeBottom}>
                    <Text open_sans style={{fontSize: 18}}>Cancel</Text>
                </Button>
                <Button style={styles.book_btn} press={book}>
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
    date_select:{
        fontSize: 15,
        color: 'white'
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
        width: theme.size.width * .41
    },
    box_select:{
        borderWidth: 0.5,
        borderColor: '#1DA6FD',
        backgroundColor:'#1DA6FD',
        paddingVertical: 10,
        width: theme.size.width * .41
    },
    circle: {
        height : 83,
        width : 83,
        borderRadius: 100,
    },
    time_click: {
        position: 'absolute',
        height : theme.size.height * .55,
        width: theme.size.width,
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