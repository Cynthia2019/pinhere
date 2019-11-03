import React, {Component} from 'react'; 
import { View, Dimensions, StyleSheet, TouchableOpacity, Text, Modal, ActivityIndicator } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { Input, Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Google from 'expo-google-app-auth'
import * as firebase from "firebase/app";

export default class LoginPage extends Component{
    state={
        bodytext: 'No account yet? Sign up!',
        visible: false
    }
    /*checkLoggedIn=()=>{
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.navigation.navigate('Home')
            } else {
                console.log('login in failed')
            }
        })
    }*/
    //open the website for google sign in 
    signInWithGoogleAsync = async ()=> {
        this.setState({visible: true})
        try {
          const result = await Google.logInAsync({
            //androidClientId: YOUR_CLIENT_ID_HERE,
            iosClientId: '457257000572-1a51d8l6ebhmnp1dp34lmmb67njt1q0r.apps.googleusercontent.com',
            scopes: ['profile', 'email'],
          });
          if (result.type === 'success') {
              this.onSignIn(result)
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          return { error: true };
        }
    }
    //check if the user has signed in already
    onSignIn = googleUser => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        var unsubscribe = firebase.auth().onAuthStateChanged(
        function (firebaseUser) {
         console.log('unsubscribe')
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(googleUser, firebaseUser)) {
              console.log('not equal')
            // Build Firebase credential with the Google ID token.
            var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken, 
                googleUser.accessToken);
            // Sign in with credential from the Google user.
            firebase.auth().signInWithCredential(credential)
            .then(result => {
                console.log('user signed in')
                this.setState({visible: false})
                this.props.navigation.navigate('Home')
                firebase
                    .database()
                    .ref('/users/'+ result.user.uid)
                    .set({
                        gmail: result.user.email, 
                        picture: result.additionalUserInfo.profile.picture,
                        firstname: result.additionalUserInfo.profile.given_name, 
                        lastname: result.additionalUserInfo.profile.family_name
                    })
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              console.log(error)
            });
          } else {
            console.log('User already signed-in Firebase.');
          }
        }.bind(this));
      }
      isUserEqual=(googleUser, firebaseUser) => {
          console.log('equal run')
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                providerData[i].uid === googleUser.getBasicProfile().getId()) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      }
    render(){
        const { navigate } = this.props.navigation;
        return(
            <View>
                <LinearGradient colors={['#fdcbf1', '#e6dee9']} style={{height:'100%'}}>
                    <View style={styles.smallContainer}>
                        <View style={styles.blocks}>
                            <Input placeholder='Enter your email' leftIcon={<Ionicons name='ios-mail' size={24} style={{paddingRight: 10, color: 'rgba(0,0,0,0.7)'}}/>}
                            label='Email' labelStyle={{fontFamily:'Ubuntu-Bold', fontSize:18, color: '#fff', padding:5}} 
                            inputContainerStyle={styles.inputContainer} />
                        </View>
                        <View style={styles.blocks}>
                            <Input placeholder='Enter your password' leftIcon={<Icon name='lock' size={24} style={{paddingRight: 10, color: 'rgba(0,0,0,0.7)'}}/>}
                            label='Password' labelStyle={{fontFamily:'Ubuntu-Bold', fontSize:18, color: '#fff', padding:5}} 
                            inputContainerStyle={styles.inputContainer} />
                        </View>
                        <Button title='Login' type='outline' icon={<Ionicons name='ios-log-in' size={24} style={{paddingRight: 10, color: 'rgba(0,0,0,0.7)'}}/>}
                        buttonStyle={styles.button} titleStyle={{fontSize:20, fontFamily: 'Ubuntu-Bold', color: 'rgba(0,0,0,0.7)'}} 
                        onPress={()=>this.checkLoggedIn} containerStyle={{paddingTop: 30}}></Button>
                        <Button title='Google' type= 'outline' onPress={()=>this.signInWithGoogleAsync()}></Button>
                        <TouchableOpacity onPress={()=>navigate('SignUp')}>
                            <Text style={{textDecorationLine:'underline', color:'#7C7C7C', alignSelf:'center', paddingTop: 10}}>No account yet? Sign up!</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
                <Modal visible={this.state.visible} animationType='fade' transparent={true}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </Modal>
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
        padding: 20, 
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