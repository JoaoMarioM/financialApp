import React, {useContext} from 'react'
import {View, ActivityIndicator} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator} from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

import SignIn from './pages/signIn'
import SignUp from './pages/signUp'

import Home from './pages/home'
import Register from './pages/register'
import Profile from './pages/profile'

import AuthProvider, {AuthContext} from './contexts/auth'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

export function Authentication(){
    return(
    <Stack.Navigator headerMode="none" initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
    )
}

export function DrawerNavigator(){


    return(
        <Drawer.Navigator initialRouteName="Home"
        drawerStyle={{backgroundColor: '#000'}}
        drawerContentOptions={{
            labelStyle:{
                fontWeight: 'bold',
                fontSize: 17
            },
                activeTintColor: '#fff',
                activeBackgroundColor: '#00a1d7',
                inactiveBackgroundColor: '#000',
                inactiveTintColor: '#fff',
                itemStyle:{
                    marginVertical: 5
                }
        }}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Registrar" component={Register} />
            <Drawer.Screen name="Perfil" component={Profile} />

        </Drawer.Navigator>
    )
}

function StackNavigator(){

    const {signed, loading} = useContext(AuthContext)

    if(loading){
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size="large" color="#333" />
        </View>
    }

    return(
        <Stack.Navigator headerMode="none" initialRouteName="Authentication">
        {  signed ? 
          <Stack.Screen name="Authentication" component={Authentication} /> :
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        }
        </Stack.Navigator>
    )
}

export default function Route(){

    return(
        <NavigationContainer>
            <AuthProvider>
                <StackNavigator />
            </AuthProvider>
            
        </NavigationContainer>
    )
    
}

