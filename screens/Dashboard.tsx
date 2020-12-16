import React, { useEffect, useRef, useState} from 'react';
import { Animated, StyleSheet, FlatList} from 'react-native';
import { Button, Circle, Pic, Text, View } from '../components';
import { theme } from '../constants';


const options = [
  {title: 'Emergency' , source: require('../assets/images/dashboard/pin.png'), route: 'Emergency' , key:1  },
  {title: 'Appointment' , source: require('../assets/images/dashboard/calendar.png'), route: 'Appointment' , key: 2 },
  {title: 'Health Tips' , source: require('../assets/images/dashboard/healthcare.png'), route: 'HealthTips' , key: 3 },
  {title: 'Medicine\nReminder' , source: require('../assets/images/dashboard/clock.png'), route: 'MedicineReminder' , key: 4},
]
export default function DashBoard({navigation}){

  return(
    <View flex={1} style={styles.container}>
      <Pic src={require('../assets/images/dashboard/Bell.png')} style={styles.bell} touchable press={()=> navigation.navigate('Notifications')}width={30} />
      <View center middle flexDirection={'row'}flex={1}>
        <Pic src={require('../assets/images/hospital_line.png')} marginRight={theme.size.margin * 2} width={100}/>            
        <Text title gray >HOSPITAL <Text title light_blue>LINE</Text></Text>

      </View> 

      <View style={styles.dashboard} flex={2} >
        <FlatList
          numColumns={2}
          data={options}
          renderItem={({item}) => (
            <View style={styles.dashboard_item} touchable press={()=> navigation.navigate(item.route)} center middle flexDirection={'column'}>
              <Pic src={item.source} />
              <Text size={theme.size.normal - 2} gray open_sans center>{item.title}</Text>
            </View>
          )}
          
          />
      </View>          
      <Pic src={require('../assets/images/Home.png')} style={styles.home } touchable press={()=>navigation.pop()} width={80} />
 
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container:{
    paddingTop: theme.size.padding * 3,
  },
  bell: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,    
  },
  dashboard:{
    marginVertical: 0,
    padding: theme.size.padding,
  },
  dashboard_item: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.color.light_accent, 
    margin: theme.size.margin + 5,
    padding: theme.size.padding,
    height: theme.size.normal * 9,
    width: theme.size.normal * 9,  
  },
  home:{
    alignSelf:'center',
  }
})