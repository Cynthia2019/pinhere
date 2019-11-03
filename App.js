import React from 'react';
import MainPage from './src/pages/main'
import MapPage from './src/pages/mapDisplay'
import LoginPage from './src/pages/login'
import SignupPage from './src/pages/signup'
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import * as firebase from "firebase/app";
import firebaseConfig from './config'

firebase.initializeApp(firebaseConfig)

const AppNaviagtor = createDrawerNavigator({
  Home: MainPage, 
  Map: MapPage,
  Login: LoginPage,
  SignUp: SignupPage
}, 
{
  initialRouteName: 'Home',
})
const AppContainer = createAppContainer(AppNaviagtor)

export default class App extends React.Component {
  state={fontLoaded: false}
  async fontLoading(){
    await Font.loadAsync({
      'Ubuntu-Bold': require('./assets/fonts/Ubuntu-Bold.ttf')
    })
  }
  render() {
    if(!this.state.fontLoaded){
      return(
      <AppLoading 
      startAsync={this.fontLoading} 
      onError={()=>{console.warn}}
      onFinish={()=>this.setState({fontLoaded: true})}/>)
    }
    return <AppContainer />;
  }
}
