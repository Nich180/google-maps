import PropTypes from "prop-types";
import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import MapNavBar from "../../components/dashboards/mapNavBar";
import GoogleGetBounds from "./../../components/map/mapAPI_v4";
import LoadingIcon from "../../components/animations/loadingIcon";
import UserAccButton from "../../components/dashboards/userAccButton";
import Response from "../../services/Requests/Version2/BuildingAPICalls";
import BuildingsRequest from "../../services/Requests/Version2/BuildingAPICalls";
import axios from "axios";
import CustomizedSnackbars from "../../components/materialUiComponents/snackbar";

const UserAccountStyles = theme => ({
  UserText: {
    padding: `0px`,
    background: `none`,
    boxShadow: `none`,
    paddingTop: `10px`,
    padding: `10px 0px 0px 15px`,
    [theme.breakpoints.down("sm")]: {
      display: `none`
    },
    [theme.breakpoints.up("md")]: {
      display: `content`
    }
  }
});


//User account is the button to logout of the application
function UserAccount(props) {
  const { classes, onLogout } = props;
  return (
    <React.Fragment>
      <Paper className={classes.UserText}>
        <p>{`Welcome user, ${localStorage.getItem("username")}`}</p>
      </Paper>
      <UserAccButton onLogout={onLogout} width={"10%"} />
    </React.Fragment>
  );
}

const UserAccountWrapper = withStyles(UserAccountStyles)(UserAccount);

var originOptions = [{}];

const styles = theme => ({
  UserAccountLocation: {
    zIndex: `10`,
    flex: "none",
    color: `white`,
    position: "absolute",
    display: `-webkit-inline-box`,
    [theme.breakpoints.down("sm")]: {
      background: `#fff`,
      left: "20px",
      bottom: `25px`,
      boxShadow: `0px 0.85px 1px 1px rgba(0,0,0, 0.2)`
    },
    [theme.breakpoints.up("md")]: {
      background: `#2196f3`,
      boxShadow: `-5px 6px 2px 1px rgba(0,0,0, 0.0)`,
      right: "10px",
      top: `5px`
    }
  }
});

class MapPage extends Component {
  //Retrieves data from the FilterSettings Data js (Placeholder)
  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      loadingMarkers: false,
      viewportPos: {
        ma: { j: -27.477516397756578, l: -27.458953687072537 },
        ga: { l: 153.0483616342783, j: 153.00716290380956 }
      },
      newMarkerCoords: { lat: 0, lng: 0 },
      openAlertNewMarkerModal: false,
      zoomHeight: `low`,
      ownerData: {},
      options: [{}],
      single: "",
      map: React.createRef(),
      bMarkers: [
        {
          building_id: 897,
          latitude: -17.46748,
          longitude: 123.028656
        }
      ],

      highMapCount: [
        {
          count: 110,
          latitude: -27.46690636363636,
          longitude: 153.0287678272728
        }
      ]
    };

    this.handleOpenSnackbar = this.handleOpenSnackbar.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleMapMarkers = this.handleMapMarkers.bind(this);
  }

  signal = axios.CancelToken.source();

  handleOpenSnackbar = () => {
    this.setState({ snackbarOpen: true });
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  componentDidMount() {
    this.setState({ snackbarOpen: true });
    this.loadingMarkers();
  }

  componentWillUnmount() {
    this.signal.cancel(`Api is being cancelled`);
  }

  loadingMarkers = async () => {
    // Get search results on owners
    const response = await BuildingsRequest.GETsearchOwners("a");
    const ownersSearch = response.data.data;
    originOptions = ownersSearch;
    this.setState({ options: ownersSearch, loadingMarkers: true });
    try {
      const buildingTags = await Response.POSTbuildings(
        this.signal.token,
        this.state.single,
        "low",
        -27.458953687072537,
        -27.477516397756578,
        153.00716290380956,
        153.0483616342783
      );
      this.setState({ loadingMarkers: false, snackbarOpen: false });
      await this.setStateAsync({ coords: buildingTags });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  setStateAsync(state) {
    // *Calls the filtered list functions
    return new Promise(resolve => {
      this.setState({ bMarkers: state.coords });

      if (this.state.zoomHeight === "high" && state.coords.length > 0)
        return this.setState({ highMapCount: state.coords });
    });
  }

  handleMapMarkers = async e => {
    let zoomLevelFloat = this.state.map.current.getZoom();
    let zoomLevelString = "low";

    if (zoomLevelFloat < 14) {
      zoomLevelString = "high";
    } else zoomLevelString = "low";

    this.setState({ zoomHeight: zoomLevelString, viewportPos: e });

    localStorage.setItem("zoomHeight", zoomLevelString);
    const buildingTags = await Response.POSTbuildings(
      this.state.single,
      zoomLevelString,
      e.ma.l,
      e.ma.j,
      e.ga.j,
      e.ga.l
    );

    await this.setStateAsync({ coords: buildingTags });
  };

  handleSearchChange = async value => {
    const { viewportPos, single, zoomHeight } = this.state;
    if (value !== null) {
      var label = value.label;
    }
    if (label !== null) {
      this.setState({ single: label });

      const buildingTags = await Response.POSTbuildings(
        single,
        zoomHeight,
        viewportPos.ma.l,
        viewportPos.ma.j,
        viewportPos.ga.j,
        viewportPos.ga.l
      );

      await this.setStateAsync({ coords: buildingTags });
    }
  };

  handleInputChange = async value => {
    const response = await BuildingsRequest.GETsearchOwners(value);
    // this.setState({ options: response.data.data });
  };

  render() {
    const {
      bMarkers,
      map,
      zoomHeight,
      viewportPos,
      highMapCount,
      snackbarOpen
    } = this.state;
    const { loggingOff, deleteKeyAccess, onLogout, classes } = this.props;
    return (
      <React.Fragment>
        {loggingOff ? (
          <React.Fragment>
            <LoadingIcon IconSubText={"Attempting to log off"} />
          </React.Fragment>
        ) : (
          <div style={{ height: "100%" }}>
          {/* The profile icon to logout of the system */}
            <Paper className={classes.UserAccountLocation}>
              <UserAccountWrapper onLogout={onLogout} />
            </Paper>


          {/* The navigation bar you see when you're logged into the app contains search */}
            <MapNavBar
              InputChange={this.handleInputChange}
              onSingle={this.state.single}
              onSelectChange={this.handleSearchChange}
              options={this.state.options}
              viewportBounds={viewportPos}
              deleteKeyAccess={deleteKeyAccess}
              userName={localStorage.getItem(`username`)}
            />

            {/* The primary feature of the application, the googleGetBounds is the map api, markers, and entire */}
            <div style={{ height: "95%" }}>
              <GoogleGetBounds
                highMapCount={highMapCount}
                zoomHeight={zoomHeight}
                map={map}
                bMarkers={bMarkers}
                onMapMarkers={this.handleMapMarkers}
                inputChange={event => this.handleCoords(event)}
                style={{ height: "100%" }}
              />
            </div>
          </div>
        )}

        {/* Warning sign */}
        <CustomizedSnackbars
          message={`Loading building markers.`}
          variant={`info`}
          snackbarOpen={snackbarOpen}
          snackbarClose={this.handleCloseSnackbar}
        />
      </React.Fragment>
    );
  }
}

MapPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MapPage);
// s
