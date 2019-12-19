import React, { Component } from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';
import MapStyles from '../../mapStyles';
import request from '../../services/Requests/Version1/xmlHttpReq';
import ReactMarker from './markerVersions/markerV1';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CreateNewForm from './modals/createNewMarker';
import PlaceholderMarker from './markerVersions/newMarker';
import '../../public/stylesheets/css/buttonColors.css';

const GoogleMapExample = withScriptjs(
	withGoogleMap((props) => (
		<GoogleMap
			ref={props.mapRef}
			defaultOptions={{ disableDoubleClickZoom: true, styles: MapStyles }}
			defaultCenter={{ lat: -27.468309, lng: 153.030518 }}
			defaultZoom={20}
			onDragEnd={props.onClickReq}
			onZoomChanged={props.onClickReq}
			onDblClick={props.newMarker}
			onMove
			markers={props.markers}
		>
			{props.markers.map((bMarker) => (
				<div key={bMarker.building_id}>
					<ReactMarker properties={props} buildingMarker={bMarker} />
				</div>
			))}

			<PlaceholderMarker position={props.newPosition} />
		</GoogleMap>
	))
);

const styles = (theme) => ({});

class GoogleGetBounds extends Component {
	constructor(props) {
		super(props);
		this.state = {
			infoWindowOpen: false,
			newMarkerCoords: { lat: 0, lng: 0 },
			openAlertNewMarkerModal: false,
			openModal: false,
			map: React.createRef(),
			bMarkers: [
				{
					building_id: 897,
					latitude: -17.46748,
					longitude: 123.028656
				}
			]
		};
		this.handleAcceptNewMarker = this.handleAcceptNewMarker.bind(this);
		this.handleCloseMarkModal = this.handleCloseMarkModal.bind(this);
		this.handleCloseMarkerModal = this.handleCloseMarkerModal.bind(this);
	}

	setStateAsync(state) {
		// *Calls the filtered list functions
		return new Promise((resolve) => {
			this.setState({ bMarkers: state.coords });
		});
	}

	// *Grabs the bounds then makes the post
	handleMapClick = async (bounds) => {
		const buildingTags = await request.postCoordinates(bounds.ma.l, bounds.ma.j, bounds.ga.j, bounds.ga.l);

		console.log(bounds.ma.l, bounds.ma.j, bounds.ga.j, bounds.ga.l);
		// !calls the promise function to setState on markers data
		await this.setStateAsync({ coords: buildingTags });
	};

	// *These handles control the Alert New Marker Modal
	handleAcceptNewMarker = () => {
		this.setState({ openAlertNewMarkerModal: false });
	};
	handleCloseMarkerModal = () => {
		let MarkerPos = { lat: 0, lng: 0 };
		this.setState({ openAlertNewMarkerModal: false });
		this.setState({ newMarkerCoords: MarkerPos });
	};
	// *The handles above handle the Alert New Marker Modal

	handleCloseMarkModal = () => {
		this.setState({ openModal: false });
	};

	handleClick = (e) => {
		let MarkerPos = { lat: 0, lng: 0 };
		MarkerPos.lat = e.latLng.lat();
		MarkerPos.lng = e.latLng.lng();

		if (this.state.openModal === false) {
			this.setState({ newMarkerCoords: MarkerPos });
		}

		this.setState({ openAlertNewMarkerModal: true });
	};

	handleMarkerClicked = (e) => {
		localStorage.setItem('buildingID', e);
		const { bMarkers } = this.state;
		let EmptyMarkers = [ {} ];

		let nonFitting = bMarkers.filter((marker) => e !== marker.building_id);
		for (let i = 0; i < nonFitting.length; i++) {
			nonFitting[i].status = 'COM';
		}
		EmptyMarkers = [ ...nonFitting ];

		let statusMarkers = bMarkers.filter((marker) => e === marker.building_id);
		statusMarkers[0].status = 'Open';

		EmptyMarkers.push(statusMarkers[0]);
		this.setState({ bMarkers: EmptyMarkers });
	};

	render() {
		const { infoWindowOpen, bMarkers, openAlertNewMarkerModal, newMarkerCoords } = this.state;

		return (
			<React.Fragment>
				<GoogleMapExample
					markerClicked={this.handleMarkerClicked}
					infoWindowOpen={infoWindowOpen}
					newPosition={newMarkerCoords}
					animation={this.state.map}
					mapRef={this.state.map}
					newMarker={(e) => this.handleClick(e)}
					onClickReq={() => {
						this.handleMapClick(this.state.map.current.getBounds());
					}}
					googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCS7rTd9gmzURhMW5xMlEorXJk_tFWnerM"
					loadingElement={<div style={{ height: `100%` }} />}
					containerElement={<div style={{ height: `100%` }} />}
					mapElement={
						<div
							className="mapElementPosition"
							style={{
								height: `100%`,
								position: `absolute!important`,
								zIndex: -1
							}}
						/>
					}
					markers={bMarkers}
				/>

				<CreateNewForm
					openAlertNewMarkerModal={openAlertNewMarkerModal}
					closeAlertNewMarkerModal={this.handleCloseMarkerModal}
				/>

				{/* Modal Box whether Yes or No to create new building marker */}
			</React.Fragment>
		);
	}
}

GoogleGetBounds.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GoogleGetBounds);
