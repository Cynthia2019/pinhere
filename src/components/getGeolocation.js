import React, { Component } from 'react' 
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location'
import { Tooltip } from 'react-native-elements'

var db = SQLite.openDatabase('locations.db')
console.log(db, 'main')

export default class GetGeolocation extends Component {
    constructor(){
        super()
        this.state={
            locations: null,
            long: null, 
            lat: null, 
            date: null, 
            intervalIsSet: false, 
            visible: false, 
            info: null,
        }
        this.tooltipRef = React.createRef()
    }
    componentDidMount(){
        db.transaction(
        tx=>{
        tx.executeSql("drop table locations;");
        tx.executeSql("create table if not exists locations (id integer primary key not null, long int, lat int, date int);")})
    }
    getLocation=()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            this.setState({long: position.coords.longitude, lat: position.coords.latitude})
            this.add(position.coords.longitude, position.coords.latitude, position.timestamp)
        }, (error)=>{console.error(error)}, {timeout: 10000, maximumAge: 0, enableHighAccuracy: false})
    }

    add=(long,lat)=>{
        if(!long){return false}
        db.transaction(tx=>{
            tx.executeSql('insert into locations (long, lat) values (?, ?)', [long, lat])
        },error=>{console.error(error)}, this.update)
        console.log(db, 'updated db')
    }
    update=()=>{
        db.transaction(tx=>{
            tx.executeSql('select * from locations', [], (_, { rows })=>
            {this.setState({
                locations: rows._array
            })
            console.log('main locations: ', this.state.locations)
            this.reverseGeolocation()
        })
        })
    }
    reverseGeolocation = async ()=>{
        let info = await Location.reverseGeocodeAsync({latitude: this.state.lat, longitude: this.state.long})
        this.setState({
            info: JSON.parse(JSON.stringify(info))[0],
        })
        this.tooltipRef.current.toggleTooltip()
    }
    render(){
        if(this.state.locations){
            clearInterval(this.state.interval)
        }
        return(
            <View style={styles.container}>
                <View style={styles.tooltip}>
                {this.state.info?<Tooltip popover={<Text>{this.state.info.city}, {this.state.info.country}</Text>} ref={this.tooltipRef}
                withOverlay={false} width={200} containerStyle={styles.tooltipContainer} backgroundColor={'rgba(0, 0, 0, 0.40)'} withPointer={false}/>:null}
                </View>
                <View sytle={styles.circleContainer}>
                    <LinearGradient colors={['#fdcbf1', '#e6dee9']} style={styles.button_1}>
                        <TouchableOpacity style={styles.button_2}>
                        <TouchableOpacity onPress={()=>this.getLocation()}>
                            <LinearGradient colors={['#fdcbf1', '#e6dee9']} style={styles.button_3}>
                                <Text style={styles.main_text}>Pin Here</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        )
    }

}
const base_size = Dimensions.get('window').width
styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    circleContainer: {
        width: 200, 
        height: 200,
        alignItems: 'center', 
        borderColor: 'black', 
        borderWidth: 2, 
    },
    button_1: {
        width: base_size * 0.6, 
        height: base_size * 0.6,
        borderRadius: base_size * 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_2: {
        backgroundColor: 'white',
        width: base_size* 0.48, 
        height: base_size * 0.48,
        borderRadius: base_size * 0.24,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_3: {
        width: base_size * 0.4, 
        height: base_size * 0.4,
        borderRadius: base_size * 0.2,
        padding: 15, 
    }, 
    tooltip: {
        position: 'absolute', 
        top: base_size /3, 
        left: base_size /3,
    },
    tooltipContainer: {
        alignItems: 'center', 
        justifyContent: 'center',
    },
    main_text: {
        fontFamily: 'Ubuntu-Bold',
        fontSize: 30, 
        color: 'white', 
        textAlign: 'center', 
        paddingTop: 15,
    }
})

//{this.state.lat?this.state.lat:30}  this.state.long?this.state.long:30} 
//<Map longitude={this.state.long}  latitude={this.state.lat}/>

/**
                 <MapView>
                    {this.state.locations?this.state.locations.map(location=> {
                        return <Marker coordinate={{longitude: location.longitude, latitude: location.latitude}}></Marker>
                    }):<></>}
                </MapView>

                tx.executeSql("drop table locations;");

                        position: "absolute",
        top: Dimensions.get('window').height* 0.75, 
        left: Dimensions.get('window').width /4, 

                <Tooltip popover={this.state.visible?<Text>{this.state.info.city}, {this.state.info.country}</Text>:null}>
 */