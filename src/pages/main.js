import React, { Component } from 'react' 
import { StyleSheet, Text, View, TouchableOpacity, Button, Dimensions } from 'react-native';
import GetGeolocation from '../components/getGeolocation'



export default class MainPage extends Component{
    static navigationOptions = {
        title: 'Home',
      };    
    state = {
        open: false
    }
    onOpenChange=()=>{
        this.setState({open: !open})
    }
    render(){
        return(
            <View style={styles.background}>
            
            <GetGeolocation />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    background:{
        height: Dimensions.get('window').height, 
        width: Dimensions.get('window').width
    }
})

/*
                   [<TouchableOpacity><Text>Home</Text></TouchableOpacity>,
                    <TouchableOpacity><Text>Map</Text></TouchableOpacity> 
                    
                    background-image: linear-gradient(to top, #fdcbf1 0%, #fdcbf1 1%, #e6dee9 100%);
                    */