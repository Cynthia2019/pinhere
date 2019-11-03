import React, {Component} from 'react'; 
import { View, Dimensions, StyleSheet, Touchable, Text } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';

export default class SignupPage extends Component{
    render(){
        return(
            <View>
                <LinearGradient colors={['#fdcbf1', '#e6dee9']} style={{height:'100%'}}>
                <View style={styles.smallContainer}>
                    <View style={styles.blocks}>
                            <Input leftIcon={<Icon name='user' size={24} style={{paddingRight: 10, color: 'rgba(0,0,0,0.7)'}}/>}
                            label='Username' labelStyle={{fontFamily:'Ubuntu-Bold', fontSize:18, color: '#fff', padding:5}} 
                            inputContainerStyle={styles.inputContainer} />
                    </View>
                    <View style={styles.blocks}>
                            <Input leftIcon={<Ionicons name='ios-mail' size={24} style={{paddingRight: 10, color: 'rgba(0,0,0,0.7)'}}/>}
                            label='Email' labelStyle={{fontFamily:'Ubuntu-Bold', fontSize:18, color: '#fff', padding:5}} 
                            inputContainerStyle={styles.inputContainer} />
                    </View>
                    <View style={styles.blocks}>
                            <Input leftIcon={<Icon name='lock' size={24} style={{paddingRight: 10, color: 'rgba(0,0,0,0.7)'}}/>}
                            label='Password' labelStyle={{fontFamily:'Ubuntu-Bold', fontSize:18, color: '#fff', padding:5}} 
                            inputContainerStyle={styles.inputContainer} />
                    </View>
                    <View style={styles.blocks}>
                            <Input leftIcon={<Icon name='lock' size={24} style={{paddingRight: 10, color: 'rgba(0,0,0,0.7)'}}/>}
                            label='Confirm Password' labelStyle={{fontFamily:'Ubuntu-Bold', fontSize:18, color: '#fff', padding:5}} 
                            inputContainerStyle={styles.inputContainer} />
                    </View>
                    <Button title='Sign Up' type='outline' icon={<Ionicons name='ios-checkbox-outline' size={24} style={{paddingRight: 10, color: 'rgba(0,0,0,0.7)'}}/>}
                        buttonStyle={styles.button} titleStyle={{fontSize:20, fontFamily: 'Ubuntu-Bold', color: 'rgba(0,0,0,0.7)'}} containerStyle={{paddingTop: 30}}></Button>
                </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    smallContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    blocks: {
        padding: 14, 
    }, 
    inputContainer: {
        borderBottomWidth: 0,
        backgroundColor: '#fff', 
        borderRadius: 15, 
        height: 50
    }, 
    button:{
        borderRadius: 15, 
        borderWidth: 0,
        backgroundColor: '#fff', 
        width: Dimensions.get('window').width / 3, 
        alignSelf: 'center', 
        height: 50,
    }
})