import * as React from "react"
import { Dimensions, StyleSheet, Text, View , SafeAreaView} from "react-native"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Callout, Circle, Marker } from "react-native-maps"
import { useEffect } from "react/cjs/react.development"

export default function App() {
	const [ pin, setPin ] = React.useState({
        latitude: 33.66931,
        longitude: 73.07428,
	})
	const [ region, setRegion ] = React.useState({
        latitude: 33.66931,
        longitude: 73.07428,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
	})
	const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=100&type=restaurant&key=AIzaSyAVr4HUJqchm9yOy5JrVdhYCR8s7EoS0wM';
        fetch(url)
            .then((response) => response.json())
            .then((JsonResponse) => {
                // console.error(JsonResponse)
                console.log("hhhhh",JsonResponse)
            })
            .catch((error) => {
                alert('error')
            });

	return (
		<SafeAreaView style={{ marginTop:Platform.OS === 'ios' ? 40 : 0, flex: 1 }}>
			<GooglePlacesAutocomplete
				placeholder="Search"
				fetchDetails={true}
				GooglePlacesSearchQuery={{
					rankby: "distance"
				}}
				onPress={(data) => {
					// 'details' is provided when fetchDetails = true
					console.log("ddd",data)
					setRegion({
						latitude: details.geometry.location.lat,
						longitude: details.geometry.location.lng,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					})
				}}
				query={{
					key: "KEY",
					language: "en",
					components: "country:us",
					types: "establishment",
					radius: 30000,
					location: `${region.latitude}, ${region.longitude}`
				}}
				styles={{
					container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
					listView: { backgroundColor: "white" }
				}}
			/>
			<MapView
				style={styles.map}
				initialRegion={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
				}}
				
				// provider="google"
			>
				<Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
				<Marker
					coordinate={pin}
					pinColor="black"
					draggable={true}
					onDragStart={(e) => {
						console.log("Drag start", e.nativeEvent.coordinates)
					}}
					onDragEnd={(e) => {
						setPin({
							latitude: e.nativeEvent.coordinate.latitude,
							longitude: e.nativeEvent.coordinate.longitude
						})
					}}
				>
					<Callout>
						<Text>I'm here</Text>
					</Callout>
				</Marker>
				<Circle center={pin} radius={1000} />
			</MapView>
		</SafeAreaView>
	)
}

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