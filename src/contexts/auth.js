import React, {useState, createContext, useEffect} from 'react'

import { AsyncStorage } from 'react-native';

import firebase from '../services/fareBaseConnection'

export const AuthContext = createContext({})

export default function AuthProvider({ children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadAuth, setLoadAuth] = useState(false)

      useEffect(() => {
    async function loadStorage(){
     const storageUser = await AsyncStorage.getItem('Auth_user')

      if(storageUser){
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }
      setLoading(false)
    }
    loadStorage()
  }, [])

    async function signIn(email, password){
      setLoadAuth(true)
        await firebase.auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
          let uid = value.user.uid
          await firebase.database().ref('users').child(uid).once('value')
          .then((snapshot) => {
            let data = {
              uid: uid,
              nome: snapshot.val().nome,
              email: value.user.email,
            }
            setUser(data)
            storageUser(data)
            setLoadAuth(false)
          })
        })
        .catch((error) => {
          alert(error.code )
          setLoadAuth(false)
        })
      }


       async function storageUser(data){
      await AsyncStorage.setItem('Auth_user', JSON.stringify(data))
  }
      async function signOut(){
        await firebase.auth().signOut()
        await AsyncStorage.clear()
        .then(() =>{
          setUser(null)
        })
      }

      async function signUp(nome, email, password){
        setLoadAuth(true)
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
          let uid = value.user.uid
          await firebase.database().ref('users').child(uid).set({
            saldo: 0,
            nome: nome
          })
          .then(() => {
            let data = {
              uid: uid,
              nome: nome,
              email: email
            }
            setUser(data)
            storageUser(data)
            setLoadAuth(false)

          })
         
        })
        .catch((error) => {
          alert(error.code)
          setLoadAuth(false)

        })
       
      }

    return(
        <AuthContext.Provider value={{signed: !user, user, signIn, signUp, signOut, loading, loadAuth}}>
            {children}
        </AuthContext.Provider>
    )
}