import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import { getStatusBarHeight} from 'react-native-status-bar-height'

export default function Header(){
    return(
        <View style={styles.statusBar}>
            <StatusBar backgroundColor="#000000" barStyle="light-content" />
        </View>
    )
}

const styles = StyleSheet.create({
    statusBar:{
        marginTop: 10 + getStatusBarHeight(),
    }
})