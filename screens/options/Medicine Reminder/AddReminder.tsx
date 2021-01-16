import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, TextInput, FlatList, KeyboardAvoidingView, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Text, View, Pic} from '../../../components';
import { theme } from '../../../constants';


const shadowList = {
  height: theme.size.height * .12,
  width: theme.size.width * .22,
  color:"#000",
  border:5,
  radius: 10,
  opacity:0.2,
  x: 0,
  y: 3,
  style:{margin: theme.size.margin * 2,
    justifyContent: 'center',
    alignItems: 'center',
    
    }
}

export default function AddReminder({navigation, route}) {

  const[show, setshow]= useState(false)
  const[showModal, setshowModal] = useState(false)
  const[mode, setMode] = useState('')
  const[datetime, setDateTime] = useState(new Date())
  const [date, setDate] = useState('Pick a Date')
  const [time, setTime] = useState('Pick a Time')
  const options = [
    {type: 'Tablet', source: require('../../../assets/images/Reminder/tablet.png'), key: 1 },
    {type: 'Capsule', source: require('../../../assets/images/Reminder/capsule.png'), key: 2},
    {type: 'Liquid', source: require('../../../assets/images/Reminder/liquid.png'), key: 3},
    {type: 'Injection', source: require('../../../assets/images/Reminder/injection.png'), key: 4},
    {type: 'Topical', source: require('../../../assets/images/Reminder/topical.png'), key: 5},
    {type: 'Inhaler', source: require('../../../assets/images/Reminder/inhaler.png'), key: 6},
    {type: 'Drop', source: require('../../../assets/images/Reminder/drop.png'), key: 7},
    {type: 'Suppository', source: require('../../../assets/images/Reminder/suppository.png'), key: 8},
    {type: 'Patches', source: require('../../../assets/images/Reminder/patches.png'), key: 9},
  ]
  const[Reminder, setReminder] = useState({
    name: '',
    typeLabel: '',
    frequency: '',
    dosage: '',
    dateTime: '',
    hour: 0,
    notes: ''
  })
  
  const [enableView,setenableView] = useState(false)


  const getDateTime = (event, datetime) => {
    const currentTime = new Date(datetime)
    console.log(currentTime);
    let dateOrTime = '';
    setshow(false);
    setReminder({...Reminder, dateTime: currentTime.toISOString()});
    switch(mode){
      case 'date': 
        dateOrTime = currentTime.toDateString();
        setDate(dateOrTime);
        break;
      case 'time': 
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        dateOrTime = hours + ':' + minutes + ' ' + ampm;
        setReminder({...Reminder, hour: currentTime.getHours()});
        setTime(dateOrTime);

        break;
    }    
  }

  const pickerHandler = (pickerMode) => {
    setMode(pickerMode);
    setshow(true);
  }

  useEffect(() => {
    console.log(Reminder)
    
  }, [Reminder])

  return(
    <View style={styles.container}>
      <View row style={[styles.modalHeader,{ margin: 0, padding: 0, }]} flex={false}>
        <View touchable press={()=>navigation.goBack()} flex={1} ><Pic src={require('../../../assets/icons/back.png')} width={40} /></View>
        <View style={{marginHorizontal: theme.size.width * .05,}} middle touchable press={()=>pickerHandler('date')}  flex={3}>
          <Text arial_bold size={20} style={styles.textLabel} white >{date}</Text>
          <View middle ><Pic src={require('../../../assets/icons/down_arrow_white.png')} width={20}></Pic></View>
        </View>
        <View touchable press={()=>navigation.navigate('MedicineReminder', {Reminder: Reminder})} middle flex={1} ><Text arial_bold size={18} style={styles.textLabel} white >OK</Text></View>
      </View>
            
      <View style={styles.setReminder} >
        
        <Text arial_bold size={18} style={styles.textLabel} purple>Medication Name</Text>     
        <TextInput
          style={styles.input}
          placeholder='Ascorbic Acid'
          placeholderTextColor='#7E7C7C'
          onFocus={()=>setenableView(false)} 
          onChangeText={(val) => setReminder({...Reminder, name: val})}/>
        
        <Text arial_bold size={18} style={styles.textLabel} purple>Medication Type: {Reminder.typeLabel}</Text>      
        <View style={styles.flatlist} flex={false}>
          <FlatList
            data={options}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View touchable press={ () => setReminder({...Reminder, typeLabel: item.type})}>
                <View style={styles.medList}  shadow={shadowList} >
                  <Pic src={ item.source} width={40}></Pic>
                  <Text arial_bold size={12}>{item.type}</Text>
                </View>
              </View>
            )}
          />
        </View >
        
            <Text arial_bold size={18} style={styles.textLabel} purple>When to take: {Reminder.frequency}</Text>      
        <DropDownPicker
            items={[
                  {label: 'Once a day',       value: ''},
                  {label: 'Everyday',         value: ''},
                  {label: 'Every other week', value: ''},
                  {label: 'Once a week',      value: ''},
                  {label: 'Twice a week',     value: ''},
                  {label: 'Thrice a week',    value: ''},
                  {label: 'On weekends',      value: ''},
                  {label: 'On weekdays',      value: ''},
              ]}
              containerStyle={{height: 40}}
              onChangeItem={item => setReminder({...Reminder,frequency: item.label})}
        />

        <View  row middle center style={styles.DosageTimeCont} flex={false}>
          <View touchable press={()=>setshowModal(true)} middle center style={[styles.DosageTime, {marginRight: theme.size.margin} ]} >
            <Pic style={{alignSelf: 'center'}} src={require('../../../assets/images/Reminder/tablet.png')} width={30}/>
            <Text arial_bold size={18} purple>Dosage</Text>                
          </View>    

          <View touchable press={()=>pickerHandler('time')} middle center style={[styles.DosageTime, {marginLeft: theme.size.margin}]} >
            <Pic style={{alignSelf: 'center'}} src={require('../../../assets/images/Reminder/clock.png')} width={40}/>             
            <Text arial_bold size={18} purple>{time}</Text>
          </View>
        </View>
        {showModal && (
          <Modal visible={showModal} transparent={true} animationType='fade'>
            <View middle style={{backgroundColor: '#000000aa'}}>
              <View style={styles.DosageModal}>
              <TextInput
                style={[styles.input, {fontWeight: 'normal', borderBottomWidth: 2, }]}
                placeholder='Intake e.g. 10ml, 250mg, 2pcs. '
                placeholderTextColor='#7E7C7C'
                onFocus={()=>setenableView(false)} 
                onChangeText={(val) => setReminder({...Reminder, dosage: val})}/>
              <View row >
                <View middle touchable press={()=>setshowModal(false)}><Text arial_bold size={18} style={styles.ModalBtn} purple>Cancel</Text></View> 
                <View row style={{borderColor: "#C4C4C4",borderWidth: 1}} flex={0}/>                
                <View middle touchable press={()=>setshowModal(false)}><Text arial_bold size={18} style={styles.ModalBtn} purple>Okay</Text></View></View>  
              </View>
            </View>
          </Modal>
        )}
        {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={datetime}
              mode={mode}
              is24Hour={false}
              display="default"
              onChange={getDateTime}
              />)} 
        <KeyboardAvoidingView style={{flex:1}} behavior='position' enabled={enableView} keyboardVerticalOffset={80}>
          <TextInput
              style={[
                styles.input, 
                {borderWidth: 1, 
                  marginTop: 8,
                  borderColor: "#C4C4C4", 
                  borderRadius: 10, 
                  height: theme.size.height * .15,
                  backgroundColor:theme.color.white  }]}
              onFocus={()=>setenableView(true)}  
              onChangeText={(val) => setReminder({...Reminder, notes: val})}        
              placeholder='Add some notes'
              multiline={true}
              numberOfLines={3}
              textAlignVertical='top'
              placeholderTextColor='#7E7C7C'/>

        </KeyboardAvoidingView>            
      </View> 
      
    </View>
  
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.color.white,
    
  },
  modalHeader:{
    backgroundColor:theme.color.purple,
    height: theme.size.height * .14,
    paddingTop: 40,
  },
  textLabel: {
    fontWeight: 'bold',
  },
  setReminder: {
    paddingTop: theme.size.width * .05,
    paddingHorizontal: theme.size.width *.1,
  },
  input:{
    borderBottomColor: "#C4C4C4", 
    borderBottomWidth: 2, 
    borderStyle: 'solid', 
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontFamily: theme.font.ARIAL_BOLD,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 0,
  },
  flatlist: {
    height: theme.size.height *.15 , 
    marginBottom: theme.size.margin * 3
  },
  medList:{
    backgroundColor: 'white',
    borderRadius:10,
    marginHorizontal: theme.size.margin * 1.4,
    padding: theme.size.padding ,
    height: theme.size.height * .12,
    width: theme.size.width * .23,
    justifyContent: 'center',
    alignItems: 'center'
  },
  DosageTimeCont:{
    flex: 1,
    flexDirection: 'row',
    marginTop: 10, 
    
    
  },
  DosageModal:{
    backgroundColor: theme.color.white,
    position: 'absolute',
    marginTop: theme.size.height * .30,
    width: theme.size.width * .8,
    padding: theme.size.padding,
    borderRadius: 10,
    
  },
  ModalBtn: {
    fontWeight: 'bold', 
    marginTop: theme.size.margin *2,

  },
  DosageTime:{
    backgroundColor: theme.color.white,
    padding: theme.size.padding,
    borderWidth: 1,
    borderColor: theme.color.purple,
    borderRadius: 10,
    height: theme.size.height * .15,
        
  },

})
