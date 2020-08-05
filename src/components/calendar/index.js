import React, {useState} from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'

import {Container, Header, Text} from './style'
import { onChange } from 'react-native-reanimated';

export default function CalendarPicker(props){

  const [dateNow, setDateNow] = useState(props.date)
 return (
   <Container>
     {
       Platform.OS === 'ios' && (
         <Header>
           <TouchableOpacity onPress={props.onClose}>
             <Text>Fechar</Text>
           </TouchableOpacity>
         </Header>
       )
     }
      <DateTimePicker
          value={dateNow}
          mode="date"
          display="default"
          style={{backgroundColor: '#fff'}}
          onChange={(event, date) => {
            const currentDate = date || dateNow
            setDateNow(currentDate)
            props.onChange(currentDate)
          }}
      />
   </Container>
  );
}