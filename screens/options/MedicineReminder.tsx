import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import ReminderItem from './Medicine Reminder/ReminderItem'
import {Text, View, Pic} from '../../components';
import { theme } from '../../constants';


const shadowOpt = {
  height: theme.size.height * .20,
  width: theme.size.width * .68,
  color:"#000",
  border:5,
  radius: 20,
  opacity:0.1,
  x: 0,
  y: 2,
  style:{margin: theme.size.margin  ,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    top: theme.size.height * .005,}
}

function MedicineReminder({navigation, route}){
  
  useEffect(() => {
    if(route.params?.Reminder){
      console.log(route.params?.Reminder)
      setmedSchedule(prevRem => {
        return[
          route.params?.Reminder,
        ...prevRem
        ]
      })
    }
  }, [route.params?.Reminder])

  const[medSchedule, setmedSchedule] = useState([
    // {name: 'Ibuprofen', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 5:30:00 ", hour: 5, notes: ''},
    // {name: 'Amoxicillin', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 11:30:00 ", hour: 11, notes: ''},
    // {name: 'Ibuprofen', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 12:30:00 ", hour: 12, notes: ''},
    // {name: 'Ascorbic Acid', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 15:30:00 ", hour: 15, notes: ''},
    // {name: 'Ascorbic Acid', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 16:30:00 ", hour: 16, notes: ''},
    // {name: 'Ascorbic Acid', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 17:30:00 ", hour: 17, notes: ''},
    // {name: 'Ibuprofen', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 20:30:00 ", hour: 20, notes: ''},
    // {name: 'Amoxicillin', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 23:30:00 ", hour: 23, notes: ''},
    // {name: 'Ascorbic Acid', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 0:30:00 ", hour: 0, notes: ''},
    // {name: 'Amoxicillin', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 2:30:00 ", hour: 2, notes: ''},
    // {name: 'Ascorbic Acid', typeLabel: 'Tablet', frequency: 'Everyday', dosage: '10 ml', dateTime: "January 5, 2021 4:30:00 ", hour: 4, notes: ''},
  ]);
  const[Items, setItems] = useState(medSchedule)
  

  const filterHandler = (Filter) => {
    setItems(medSchedule);
    switch (Filter) {
      
      case 'Morning':
        setItems((prevItems) => {
          return prevItems.filter(({hour}) => hour > 4 && hour < 12).sort()    
        })
        break;

      case 'Afternoon':
        setItems((prevItems) => {
          return prevItems.filter(({hour}) => hour > 11 && hour < 17).sort()    
        })
        break;

      case 'Evening':
        setItems((prevItems) => {
          return prevItems.filter(({hour}) => hour > 16 && hour <= 23).sort()    
        })
        break;

      case 'Night':
        setItems((prevItems) => {
          return prevItems.filter(({hour}) => hour < 5).sort()    
        })
        break;  

      default:
        break;
    }
  }


  
  return(
    <View style={styles.container}>
      <View style={styles.top} flex={false}>
        <View style={styles.intro} shadow={shadowOpt} flex={false}>
          <Text roboto size={22} purple >MEET ANNE</Text>
          <Text roboto size={12} style={{textAlign: 'center'}}>Hi! Im Anne, you can tell me your medicine intake details. You dont have to worry about being forgetful. I will be here to guide and remind you.</Text>
        </View>
      </View>
      
      <View style={styles.listContainer} flex={false}>

        <View row style={{justifyContent: 'space-between', marginBottom: theme.size.margin* 2}}  flex={false}>
          <Text arial_bold size={22} style={styles.textLabel} purple>Medication</Text>
          <Pic src={require('../../assets/images/Reminder/add.png')} width={30} touchable press={()=>navigation.navigate('AddReminder')}/>
        </View>

        <View flex={false}>
         <DropDownPicker
            defaultValue='All'
            items={[
              {label: 'All', value: 'All'},
              {label: 'Morning', value: 'Morning'},
              {label: 'Afternoon', value: 'Afternoon'},
              {label: 'Evening', value: 'Evening'},
              {label: 'Night', value: 'Night'},
            ]}
            containerStyle={{height: 40}} 
            onChangeItem={item => filterHandler(item.value)} 
        /> 
        </View>
        
        <View style={styles.flatlistCont} flex={false}>
          <FlatList
          data={Items}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={()=> <View middle style={{margin: 10}}><Text arial_bold size={20} gray>( List is empty )</Text></View>}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <ReminderItem item={item}/>
            
          )}
          />
          

        
        </View>

      </View>

    </View>
  )
}
export default MedicineReminder;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.white
  },
  top: {
    backgroundColor:theme.color.purple,
    borderBottomStartRadius: 65,
    borderBottomEndRadius: 65,
    height: theme.size.height * .12
  },
  intro: {
    backgroundColor: 'white',
    height: theme.size.height * .20,
    width: theme.size.width * .7,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.size.padding * 2.5,
    borderRadius:20,
  },
  modalHeader:{
    backgroundColor:theme.color.purple,
    height: theme.size.height * .09,
  },
  textLabel: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  listContainer:{
    justifyContent: 'center',
    alignSelf: 'center' ,
    width: theme.size.width *.8, 
    marginTop: theme.size.margin *20
  },
  flatlistCont: { 
    maxHeight: theme.size.height * .4,
    marginTop: theme.size.margin* 4,
    borderWidth: 1, 
    borderRadius: 10, 
    borderColor: '#C4C4C4'
  },
})
