import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Pic, View, Text, List } from '../../../components';
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
    return(
        <View white paddingHorizontal={theme.size.padding * 4} paddingTop={theme.size.padding * 2}>
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
                    <View flex={false} shadow={title_shadow} center middle style={styles.circle} backgroundColor={item.color}>
                        <Text avarage_sans style={{color: item.textColor}}>{item.time}</Text>
                        <Text avarage_sans style={{color: item.textColor}}>{item.ampm}</Text>
                    </View>
                    }
                />
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
    }
});