import React, {Component} from 'react'; 
import { View, Dimensions, StyleSheet } from 'react-native'; 
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('locations.db')
console.log(db, 'map')

export default class Map extends Component{
    constructor(props){
        super(props)
        this.state={
            locations: null, 
            latlng: null,
            intervalIsSet: false
        }
    }
    componentDidMount(){
        if(!this.state.intervelIsSet){
            const interval = setInterval(this.getLocations(), 4000)
            this.setState({intervalIsSet: interval, interval: interval})
        }
        db.transaction(
            tx=>{
            tx.executeSql("create table if not exists locations (id integer primary key not null, long int, lat int, date int);")})
        
    }
    getLocations=()=>{
        db.transaction(tx=>{
            tx.executeSql('select * from locations', (err)=>{console.error(err)}, (_, {rows})=>{
                this.setState({
                    locations: rows._array, 
                })
                console.log('map: ', this.state.locations, rows._array)})})
    }
    render(){
        if(this.state.locations){
            clearInterval(this.state.interval)
        return(
            <View style={styles.container}>
                <MapView style={styles.mapStyle}>
                    {this.state.locations.map(location=>{
                        return(<Marker coordinate={{latitude: location.lat, longitude: location.long}} pinColor='red'></Marker>)
                    })}
                </MapView> 
            </View>
        )
    }else {return null }}
}

const styles = StyleSheet.create({
    container:{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
    }, 
    mapStyle: {
        width: Dimensions.get('window').width * 0.8, 
        height: Dimensions.get('window').height /3
    }
})
