import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";
import { number } from "prop-types";

class CityMarkers extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { position, buildingCount } = this.props;

    let number = buildingCount.toString()
    return (
      <React.Fragment>
        <Marker
          defaultLabel={{
            text: number,
            color: "white",
            fontSize: "17px",
            fontWeight: "bold"
          }}
          icon={{
            path:
              "M 100, 100 m -75, 0a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0 ",
            fillColor: "rgb(33, 150, 243)",
            fillOpacity: 1,
            scale: 0.2,
            strokeColor: "white",
            strokeWeight: 3,
            labelOrigin: { x: 100, y: 100 }
          }}
          position={position}
        />
      </React.Fragment>
    );
  }
}
export default CityMarkers;
