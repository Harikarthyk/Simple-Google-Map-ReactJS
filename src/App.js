import React from "react";
import {GoogleMap, LoadScript} from "@react-google-maps/api";
import "./App.css";

const mapStyles = {
	height: "100vh",
	width: "100%",
};

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

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				console.log("Pos ", position);
				this.setState({
					location: {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					},
				});
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
					/>
				</LoadScript>
				{console.log(this.state.location)}
			</>
		);
	}
}

export default App;
