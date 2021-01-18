import React from 'react';
import { StyleSheet, FlatList} from 'react-native';
import { Pic, Text, View, Circle, List} from '../components';
import { BoxShadow } from 'react-native-shadow';
import { theme } from '../constants';
import { readable_time } from '../constants/theme';
import { testkolang } from '../database/Firebase';

const shadowOpt = {
    height: theme.size.height *.2,
    width: theme.size.width * .37,
    color:"#000",
    border:5,
    radius: 20,
    opacity:0.1,
    x: 0,
    y: 3,
    style:{margin: theme.size.margin  ,
          padding: 0,
          justifyContent: 'center',
          alignItems: 'center'}
}

const options = [
  {title: 'Emergency' , source: require('../assets/images/dashboard/pin.png'), route: 'Emergency' , key:1  },
  {title: 'Appointment' , source: require('../assets/images/dashboard/calendar.png'), route: 'AppointmentTopTab' , key: 2 },
  {title: 'Health Tips' , source: require('../assets/images/dashboard/healthcare.png'), route: 'HealthTips' , key: 3 },
  {title: 'Medicine Reminder' , source: require('../assets/images/dashboard/clock.png'), route: 'MedicineReminder' , key: 4},
]

export default function DashBoard({navigation}){

  return(
  <View flex={1} style={styles.container}>
    <Pic src={require('../assets/images/dashboard/Bell.png')} style={styles.bell} touchable press={()=> navigation.navigate('Notifications')}width={30} />
    <View center middle flexDirection={'row'}flex={1}>
      <Pic src={require('../assets/images/hospital_line.png')} marginRight={theme.size.margin * 2} width={100}/>            
      <Text title gray >HOSPITAL <Text title light_blue>LINE</Text></Text>

    </View> 
    <View style={styles.dashboard} flex={3} >
      <FlatList
        numColumns={2}
        data={options}
        renderItem={({item}) => (
          <View touchable press={()=> navigation.navigate(item.route)} style={styles.dashboard_item} center middle>
            <BoxShadow setting={shadowOpt}>
            <View style={styles.inside_item}center middle flex={1}>
              <Pic src={item.source} marginBottom={theme.size.margin * 3} />
              <Text size={theme.size.normal - 2} gray open_sans center>{item.title} </Text>
            </View>    
            </BoxShadow>
          </View>
        )}
        
        />
    </View>     
  </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingTop: theme.size.padding * 3,
    backgroundColor: 'white',
  },
  bell: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,    
  },
  dashboard:{
    marginVertical: 10,
    padding: theme.size.padding ,
  },
  dashboard_item: {
    
    height: theme.size.height * .25,
    width: theme.size.normal * 9,  

  },
  inside_item:{
    borderRadius: 20,
    backgroundColor: 'white',
    height: theme.size.normal * 9,
    width: theme.size.normal * 9,
  },
  
})