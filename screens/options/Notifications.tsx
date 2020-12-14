import React from 'react';
import {Text, View } from '../../components';
import { theme } from '../../constants';

export default function Notifications({navigation}){
  return(
    <View touchable press={()=>navigation.pop()} center middle flex={1}>
      <Text>Notifications</Text>
    </View>
  )
}