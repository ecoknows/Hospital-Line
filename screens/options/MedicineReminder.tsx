import React from 'react';
import {Text, View } from '../../components';
import { theme } from '../../constants';

export default function MedicineReminder({navigation}){
  return(
    <View touchable press={()=>navigation.pop()} center middle flex={1}>
      <Text>Medicine Reminder</Text>
    </View>
  )
}