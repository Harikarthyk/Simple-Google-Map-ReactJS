import React from "react";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";

import "./App.css";
import Geocode from "react-geocode";

const mapStyles = {
	height: "80vh",
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
			address: "",
		};
	}
	handleChange = (newAddress) => {
		this.setState({location: this.state.location, address: newAddress});
	};

	handleSelect = (newAddress) => {
		this.setState({location: this.state.location, address: newAddress});
		geocodeByAddress(newAddress)
			.then((results) => getLatLng(results[0]))
			.then((latLng) => {
				console.log("Success", latLng);

				// this.setState({location: latLng, address: this.state.address});
				// update center state
				// this.setState({mapCenter: latLng});
			})
			.catch((error) => console.error("Error", error));
	};
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
		this.setState({location: {lat, lng}, address: this.state.address});
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
				<LoadScript
					// onLoad={this.handleScriptLoad}
					googleMapsApiKey='AIzaSyDejMEw7iAaAFt7QvmHDhiY1NpZK7R-MRw&libraries=places'
				>
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
					<PlacesAutocomplete
						value={this.state.address}
						onChange={this.handleChange}
						onSelect={this.handleSelect}
					>
						{({
							getInputProps,
							suggestions,
							getSuggestionItemProps,
							loading,
						}) => (
							<div>
								<input
									{...getInputProps({
										placeholder: "Search Places ...",
										className: "location-search-input",
									})}
								/>
								<div className='autocomplete-dropdown-container'>
									{/* {loading && <div>Loading...</div>} */}
									{suggestions.map((suggestion) => {
										const className = suggestion.active
											? "sugg estion-item--active"
											: "suggestion-item";
										// inline style for demonstration purpose
										const style = suggestion.active
											? {backgroundColor: "#fafafa", cursor: "pointer"}
											: {backgroundColor: "#ffffff", cursor: "pointer"};
										return (
											<div
												{...getSuggestionItemProps(suggestion, {
													className,
													style,
												})}
											>
												<span>{suggestion.description}</span>
											</div>
										);
									})}
								</div>
							</div>
						)}
					</PlacesAutocomplete>
				</LoadScript>
				{/* {console.log(this.state.location)} */}
			</>
		);
	}
}

export default App;
