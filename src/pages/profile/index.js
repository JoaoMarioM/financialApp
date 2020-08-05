import React, {useContext} from 'react';
import {useNavigation} from '@react-navigation/native'

import {NewSpending, SpendingText, Logout, LogoutText} from './style'
import {Container} from '../../components/styles/container'
import ButtonMenu from '../../components/ButtonMenu'
import {Name} from '../../components/styles/name'

import Header from '../../config/statusBarConfig'

import {AuthContext} from '../../contexts/auth'



export default function Profile() {

  const {user, signOut} = useContext(AuthContext)

  const navigation = useNavigation()

 return (
   <Container>
      <Header />
      <ButtonMenu />
      <Name fontStyle={'normal'} fontSize={35}>
        {user && user.nome}
      </Name>

     <NewSpending onPress={() => navigation.navigate('Registrar')}>
       <SpendingText>Registrar novos gastos</SpendingText>
     </NewSpending>

     <Logout onPress={() => signOut()} >
       <LogoutText >Sair</LogoutText>
     </Logout>
   </Container>
  );
}