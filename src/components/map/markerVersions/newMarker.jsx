import React, { Component } from "react";
import { Marker } from "react-google-maps";

class PlaceholderMarker extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { position } = this.props;
    const BlueCircleIcon = {
			path: 'M 100, 100 m -75, 0a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0 ',
			fillColor: '#3f51b5',
			fillOpacity: 1,
			scale: 0.2,
			strokeColor: 'white',
			strokeWeight: 3
		};
    return (
      <React.Fragment>
        <Marker
          icon={BlueCircleIcon}
          key={"placeholder"}
          position={position}
          name={"The name of the marker"}
          defaultAnimation={window.google.maps.Animation.DROP}
        />
      </React.Fragment>
    );
  }
}
export default PlaceholderMarker;
