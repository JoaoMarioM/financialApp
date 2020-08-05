import React,{useContext, useState, useEffect} from 'react';
import {format, isBefore} from 'date-fns'
import {Alert, TouchableOpacity, Platform} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendarAlt} from '@fortawesome/free-solid-svg-icons'

import Header from '../../config/statusBarConfig'

import firebase from '../../services/fareBaseConnection'

import {Info, Balance, LestM, List, Moviment} from './style'
import ButtonMenu from '../../components/ButtonMenu'
import {Container} from '../../components/styles/container'
import {Name} from '../../components/styles/name'

import HistoricoList from '../../components/historicoList'
import CalendarPicker from '../../components/calendar'

import {AuthContext} from '../../contexts/auth'
import { onChange } from 'react-native-reanimated';

export default function Home() {

  const {user} = useContext(AuthContext)
  const [historic, setHistoric] = useState([])
  const [balance, setBalance] = useState(0)
  const [newDate, setNewDate] = useState(new Date())
  const [openCalendar, setOpenCalendar] = useState(false)

  const uid = user && user.uid

  useEffect(() => {
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapShot) =>{
        setBalance(snapShot.val().saldo)
      })

      await firebase.database().ref('historic').child(uid)
      .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
      .limitToLast(10).on('value', (snapShot) => {
        setHistoric([])

        snapShot.forEach((childItem) =>{
          let list = {
            key: childItem.key,
            type: childItem.val().type,
            value: childItem.val().value,
            date: childItem.val().date,
          }

          setHistoric(oldArray => [...oldArray, list].reverse())
        })
      })

    }
    loadList()
  }, [newDate])

  function handleDelete(data){
    // if(isPast(new Date(data.date))){
    //   alert('Voce não pode excuir um registro antigo!')
    //   return
    // }

    Alert.alert(
      'Atenção',
      `Você deseja excluir ${data.type} - Valor: ${data.value}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )

  }

  function handlwShowPicker(){
    setOpenCalendar(true)
  }

  async function handleDeleteSuccess(data){
    await firebase.database().ref('historic')
    .child(uid).child(data.key).remove()
    .then(async () => {
      let currentBalance = balance
      data.type === 'Despesa' ? currentBalance += parseFloat(data.value) : currentBalance -= parseFloat(data.value)
  
      await firebase.database().ref('users').child(uid)
      .child('saldo').set(currentBalance)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const onChange = (date) => {
      setOpenCalendar(Platform.OS === 'ios')
      setNewDate(date)
      console.log(date)
  }

 return (
      <Container>
        <Header />
        <ButtonMenu />
        <Info>
          <Name fontStyle={'italic'} fontSize={19}>
            {user && user.nome}
          </Name>
          <Balance>
            {Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(balance)}
          </Balance>
        </Info>

        <Moviment>
          <TouchableOpacity onPress={handlwShowPicker} >
            <FontAwesomeIcon icon={faCalendarAlt} size={30} color="#fff" />
          </TouchableOpacity>
          
          <LestM>Ultimas movimentações</LestM>
        </Moviment>
        

        <List
        showsVerticalScrollIndicator={false}
        data={historic}
        keyExtractor={item => item.key}
        renderItem={({item}) => (<HistoricoList data={item }
        deleteItem={handleDelete}  
        />)}
        />

        {
          openCalendar ? 
          <CalendarPicker
          onClose={() => setOpenCalendar(false)}
          date={newDate}
          onChange={onChange}
          /> 
         : null}
        
      </Container>
  );
} 