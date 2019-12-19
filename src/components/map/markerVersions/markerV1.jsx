import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import InfoWindowButton from "./InfoWindowComponents/infoWindowButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

class ReactMarker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };
  }



  render() {
    const BlueCircleIcon = {
      path: 'M 100, 100 m -75, 0a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0 ',
      fillColor: 'rgb(33, 150, 243)',
      fillOpacity: 1,
      scale: 0.2,
      strokeColor: 'white',
      strokeWeight: 3
    };

    const { isOpen } = this.state;
    const { buildingMarker, properties } = this.props;
    return (
      <React.Fragment>
        <Marker
          icon={BlueCircleIcon}
          key={"Gmarker.building_id"}
          position={{ lat: buildingMarker.latitude, lng: buildingMarker.longitude }}
          name={"The name of the marker"}
          onClick={() => properties.markerClicked(buildingMarker.building_id)}
          defaultAnimation={window.google.maps.Animation.DROP}
        >
          {buildingMarker.status === "Open" ? (
            <InfoWindow>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Typography variant={"h4"}>  {buildingMarker.name} </Typography>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Typography variant={"h5"}> {`${buildingMarker.street_number}
                  ${buildingMarker.street}  `} </Typography>
                </Grid>
                <br />
                <Grid item xs={8} style={{ maringTop: `5px` }}>
                  <InfoWindowButton buildingData={buildingMarker} /> </Grid>
              </Grid>
            </InfoWindow>
          ) : (
              null
            )}
        </Marker>
      </React.Fragment>
    );
  }
}
export default ReactMarker;
