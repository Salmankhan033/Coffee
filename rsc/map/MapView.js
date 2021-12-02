import React, { useState } from 'react'
import { Text, StyleSheet, View , Image, SafeAreaView, Dimensions} from 'react-native'
// import Styled from 'styled-components/native';
// import MapView from "react-native-maps";
import MapView, { Callout, Marker, PROVIDER_GOOGLE, Circle } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// interface IGeolocation {
//   latitude: number;
//   longitude: number;
// }

const GoogleMap =()=>{
  // const [region, setRegion] = useState({
  //   latitude: 33.66931,
  //   longitude: 73.07428,
  //   latitudeDelta: 0.01,
  //   longitudeDelta: 0.01
  // });
  // interface IGeolocation {
  //   latitude: number;
  //   longitude: number;
  // }
 
    const [location, setLocation] = useState({
      latitude: 33.66931,
      longitude: 73.07428,
    })
    const [ region, setRegion ] = React.useState({
      latitude: 33.66931,
      longitude: 73.07428,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
        return (

      
          <MapView
          style={styles.container}
          // provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 33.66931,
            longitude: 73.07428,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        
          provider='google'
         >
     
   <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />

        <Marker coordinate={location}
        draggable={true}
        onDragStart={(e)=>{
          console.log("Drag Start", e.nativeEvent.coordinate)
        }}
        onDragEnd={(e)=>{
         setLocation({
           latitude:e.nativeEvent.coordinate.latitude,
          longitude:e.nativeEvent.coordinate.longitude
        }) 
        }}
        title="this is a marker">
         <Callout>
           <Text>i m here</Text>
         </Callout>
          </Marker>
          <Circle
          center={location} radius={1000}/>
        </MapView>
        
      
        
        )
    
}
export default GoogleMap;
const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	}
})

