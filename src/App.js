import React from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import "./App.css";
import Geocode from "react-geocode";

const mapStyles = {
	height: "100vh",
	width: "100%",
};

Geocode.setApiKey("AIzaSyDejMEw7iAaAFt7QvmHDhiY1NpZK7R-MRw&");
Geocode.setLanguage("en");
Geocode.setRegion("in");
Geocode.enableDebug();

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: {
				lat: 41.3851,
				lng: 2.1734,
			},
		};
	}
	getAddress = () => {
		Geocode.fromLatLng(this.state.location.lat, this.state.location.lng).then(
			(response) => {
				const address = response.results[0].formatted_address;
				console.log(address);
			},
			(error) => {
				console.error(error);
			},
		);
	};
	onMarkerDragEnd = (e) => {
		console.log(e);
		const lat = e.latLng.lat();
		const lng = e.latLng.lng();
		this.setState({location: {lat, lng}});
		this.getAddress();
	};
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					location: {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					},
				});
				this.getAddress();
			},
			(error) => {
				alert(JSON.stringify(error));
			},
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 1000,
			},
		);
	}
	render() {
		return (
			<>
				<LoadScript googleMapsApiKey='AIzaSyDejMEw7iAaAFt7QvmHDhiY1NpZK7R-MRw&'>
					<GoogleMap
						mapContainerStyle={mapStyles}
						zoom={16}
						center={this.state.location}
					>
						<Marker
							position={this.state.location}
							draggable={true}
							onDragEnd={(e) => this.onMarkerDragEnd(e)}
						/>
					</GoogleMap>
				</LoadScript>
				{console.log(this.state.location)}
			</>
		);
	}
}

export default App;
