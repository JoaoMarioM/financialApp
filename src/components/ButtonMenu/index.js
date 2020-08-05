import React from 'react'
import {useNavigation} from '@react-navigation/native'

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faBars} from '@fortawesome/free-solid-svg-icons'

import {Container, BtnMenu} from './style'

export default function ButtonMenu() {

    const navigation = useNavigation()
 return (
   <Container>
       <BtnMenu onPress={() => navigation.toggleDrawer()}>
            <FontAwesomeIcon icon={faBars} color="#fff" size={30} />
       </BtnMenu>
   </Container>
  );
}
