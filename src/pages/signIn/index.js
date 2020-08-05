import React, { useState, useEffect, useContext } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faWallet} from '@fortawesome/free-solid-svg-icons'
import {ActivityIndicator} from 'react-native'

import Header from '../../config/statusBarConfig'

import {AuthContext} from '../../contexts/auth'

import { Banckground, Container } from './style'
import { Input, InputContainer} from '../../components/styles/input'
import { ButtonCad, ButtonTextCad, ButtonLog, ButtonText} from '../../components/styles/button'

export default function SignIn({navigation}) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, loadAuth } = useContext(AuthContext)

  function handleLogin(){
    signIn(email, password)
  }


 return (

   <Banckground>
      <Header />
       <Container>

         <FontAwesomeIcon icon={faWallet} size={60} style={{color:'#00a1d7', marginBottom: 30}} />

          <InputContainer>
            <Input
            height={35}
            placeholder="Email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={text => setEmail(text)}
            />
          </InputContainer>
          
          <InputContainer>
            <Input
            height={35}
            placeholder="Senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
            />
          </InputContainer>

      
          <ButtonLog onPress={handleLogin}>
            {loadAuth ? (
              <ActivityIndicator size={20} color="#fff" />) :(
              <ButtonText>Acessar</ButtonText>
            )}
            
          </ButtonLog>
       
          <ButtonCad onPress={() => navigation.navigate('SignUp')}>
            <ButtonTextCad>Cadastrar</ButtonTextCad>
          </ButtonCad>

       </Container>

       
    </Banckground>

  )
}

