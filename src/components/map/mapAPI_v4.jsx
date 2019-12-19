import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
} from "react-google-maps";
import MapStyles from "../../mapStyles";
import { compose, withProps, withHandlers } from "recompose";
import ReactMarker from "./markerVersions/markerV2";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CreateNewForm from "./modals/createNewMarker";
import "../../public/stylesheets/css/buttonColors.css";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

// compose if a very confusing tool, read docs to under the life cycle hooks 
const MapWithAMarkerClusterer = compose(
  // Declare props to be established
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCS7rTd9gmzURhMW5xMlEorXJk_tFWnerM",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: (
      <div
        className="mapElementPosition"
        style={{
          height: `100%`,
          position: `absolute!important`,
          zIndex: -1
        }}
      />
    )
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    ref={props.mapRef}
    defaultOptions={{ disableDoubleClickZoom: true, styles: MapStyles }}
    defaultZoom={16}
    // onDragStart={props.onPanToo}
    onDblClick={props.newMarker}
    // onDragEnd={props.requestMarkers}
    // onZoomChanged={props.requestMarkers}
    defaultCenter={{ lat: -27.471621, lng: 153.026627 }}
  >
  {/* These are the marker clusters you see when zoomed out blue, orange, red, pink. theyre clickable   */}
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      minimumClusterSize={5}
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
    {/*
       These are the true heart of the application. These are the markers that you're able to click on
        see the info window, open the side panel to check building information. Select buttons such as History
        and Tasks. 
  */}
      {props.markers.map(marker => (
        <div key={marker.building_id}>
          <ReactMarker
            markerColor={marker.fill_color}
            markerScale={marker.scale}
            name={marker.name}
            status={marker.status}
            address={marker.address}
            // markerClicked={props.markerClicked}
            animation={window.google.maps.Animation.DROP}
            id={marker.building_id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          />
        </div>
      ))}

      {/* <PlaceholderMarker position={props.newPosition} /> */}
    </MarkerClusterer>
  </GoogleMap>
));

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

class GoogleGetBounds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoWindow: {
        infoTitle: "",
        infoSubtitle: "",
        infoWindowOpen: false,
        infoWindowPos: { lat: -27.46879, lng: 153.020523 }
      },
      highMapCount: [
        {
          count: 110,
          latitude: -27.46690636363636,
          longitude: 153.0287678272728
        }
      ],
      openModal: false,
      openAlertNewMarkerModal: false
    };
    this.handleCloseMarkerModal = this.handleCloseMarkerModal.bind(this);
  }

  // *The handles above handle the Alert New Marker Modal

  handleCloseMarkModal = () => {
    this.setState({ openModal: false });
  };

  handleCloseMarkerModal = () => {
    let MarkerPos = { lat: 0, lng: 0 };
    this.setState({ openAlertNewMarkerModal: false });
    this.setState({ newMarkerCoords: MarkerPos });
  };

  handlePanTo = event => {};

  render() {
    const {
      infoWindow,
      openAlertNewMarkerModal,
    } = this.state;

    const {
      bMarkers,
      onMapMarkers,
      map,
      zoomHeight,
      highMapCount,
      classes
    } = this.props;
    return (
      <React.Fragment>

        {/* 
          This component links to the top of this page inside the compose method. 
          might take you a while to wrap your head around the whole thing.
        */}
        <MapWithAMarkerClusterer
          closeInfoWindow={this.handleCloseInfoWindow}
          infoWindow={infoWindow}
          theme={classes}
          zoomHeight={zoomHeight}
          // markerClicked={this.handleMarkerClicked}
          // newPosition={newMarkerCoords}
          requestMarkers={() => onMapMarkers(map.current.getBounds())}
          highMarkers={highMapCount}
          mapRef={map}
          markers={bMarkers}
        />

{/* 
    Currently not in use. originally, you can double click on the map to drop a temporary marker
    to which you'll fill in a form (no backend created yet) then submit 
*/}
        <CreateNewForm
          openAlertNewMarkerModal={openAlertNewMarkerModal}
          closeAlertNewMarkerModal={this.handleCloseMarkerModal}
        />
      </React.Fragment>
    );
  }
}

GoogleGetBounds.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GoogleGetBounds);



// 
        {/* <button
          style={{ position: `absolute`, zIndex: 1000 }}
          onClick={() =>
            this.handlePanTo(
              map.current.panToBounds(
                {
                  east: 153.03841,
                  north: -27.46704,
                  south: -27.47853,
                  west: 153.02071
                },
                0
              )
            )
          }
        >d
          onPanToo={() => this.handlePanTo(map.current)}
          click to pan to!
        </button> */}