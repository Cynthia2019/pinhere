import React, { Component } from 'react' 
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Map from '../components/map'

export default class MapPage extends Component {
    static navigationOptions = {
        title: 'Map',
      }; 
    render(){
        return(
            <View>
                 <LinearGradient colors={['#fdcbf1', '#e6dee9']} style={{height:'100%'}}>
                 <Text style={styles.text}>Places you have been...</Text>
                <Map />
                </LinearGradient>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    text: {
        fontSize: 30, 
        fontWeight: 'bold', 
        textAlign: 'center', 
        padding: 20,
    }
})