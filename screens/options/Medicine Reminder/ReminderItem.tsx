import React, {useState} from 'react';
import { StyleSheet, } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import {Text, View, } from '../../../components';
import { theme } from '../../../constants';


function Main({item}) {

  const[click, setClick] = useState(false)
  const date = new Date(item.dateTime)

  return(
    
    <View middle row style={styles.container} flex={false}>
      <View style={{textAlign:'left'}}>
        <Text arial_bold size={14}>{item.name}</Text>
        <Text arial_bold size={12}>{item.dosage}</Text>
      </View>
      <View><Text arial_bold size={12} gray>{date.getHours()}</Text></View>
      <View style={{alignItems: 'flex-end'}} touchable press={() => setClick(!click)} flex={false}>
        <AntDesign name="checkcircle" size={28} color={click === false ? "#c4c4c4": "#6A59B7"} />
      </View>

    </View>
  )
}

export default Main;

const styles = StyleSheet.create({
  container:{
    paddingVertical: theme.size.padding ,
    paddingHorizontal: theme.size.padding * 2,
    justifyContent: 'space-around'
    // borderBottomColor: "#c4c4c4",
    // borderBottomWidth: 1
  }
})