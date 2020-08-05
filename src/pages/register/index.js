import React, {useState, useContext} from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'
import {format} from 'date-fns'

import firebase from '../../services/fareBaseConnection'

import {AuthContext} from '../../contexts/auth'

import Header from '../../config/statusBarConfig'
import {Container} from '../../components/styles/container'
import {Input} from '../../components/styles/input'
import ButtonMenu from '../../components/ButtonMenu'
import {BtnR, BtnText} from './style'


export default function Register() {

  const {user} = useContext(AuthContext)


  const [value, setValue] = useState('')
  const [type, setType] = useState(null)

  function handleSubmit(){
    Keyboard.dismiss()
    if(isNaN(parseFloat(value)) || type === null){
      alert('Preencha todos os campos')
      return
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo ${type} - Valor: ${parseFloat(value)}`,
      [
        {
          text: 'Cacelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleRegister()
        }
        

      ]
    )
  }

  async function handleRegister(){
    let uid = user.uid
    let key = await firebase.database().ref('historic').child(uid).push().key
    await firebase.database().ref('historic').child(uid).child(key).set({
      type: type,
      value: parseFloat(value),
      date: format(new Date(), 'dd/MM/yyyy')
    })

    let users = firebase.database().ref('users').child(uid)
    await users.once('value').then((snapshot) =>{
      let saldo = parseFloat(snapshot.val().saldo)

      type === 'Despesa' ? saldo -= parseFloat(value) : saldo += parseFloat(value)

      users.child('saldo').set(saldo)
    })

    setValue('')
    Keyboard.dismiss()
  }

 return (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
     <Container>
     <Header />
     <ButtonMenu />
      <SafeAreaView style={{alignItems: 'center', width: '100%',}}>
        <Input
        height={55}
        placeholder="Valor desejado"
        keyboardType="numeric"
        returnKeyType="next"
        value={value}
        onChangeText={text => setValue(text)}
        />

        <RNPickerSelect
          style={{
            inputIOS:{
              height: 55,
              padding: 5,
              backgroundColor: '#fff',
              fontSize: 16,
              width: '80%',
              borderRadius: 10,
              marginTop: 10,
              marginLeft: '10%',
              textAlign: "center",
            },
            inputAndroid:{
              height: 55,
              padding: 5,
              backgroundColor: '#fff',
              fontSize: 16,
              width: '80%',
              borderRadius: 10,
              marginTop: 10,
              marginLeft: '10%',
              textAlign: "center",
            }
          }}
          placeholder={{
            label: 'Selecione o tipo',
            color: '#333',
            value: null,
          }}
          onValueChange={text => setType(text) }
          items={[
            {label: 'Receita', value:'Receita', color: '#333'},
            {label: 'Despesa', value:'Despesa', color: '#333'},
          ]}
        />

         <BtnR onPress={handleSubmit}>
           <BtnText>Registrar</BtnText>
         </BtnR>

      </SafeAreaView>
     
   </Container>
   </TouchableWithoutFeedback>
   
  );
}