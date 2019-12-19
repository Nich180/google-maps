import React, { Component } from "react";
import UserRequests from "./services/Requests/Version2/UserAPICalls";

//Alert Indicator Imports
import { ToastContainer } from "react-toastify";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import CustomizedSnackbars from "./components/materialUiComponents/snackbar";
import { withStyles } from "@material-ui/core/styles";
//Pages Imports
import Request from "./services/Requests/Version2/HistoryAPICalls";
import LoginPage from "./routes/pages/loginPage";
import MapPage from "./routes/pages/mapPage";
import LoadingIcon from "./components/animations/loadingIcon";

import Testing from "./components/testing/Testing";

import Red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },

  palette: {
    primary: {
      main: "#2196f3"
    },
    secondary: {
      main: "#3f51b5"
    },
    default: {
      main: "#2196f3"
    }
  }
});

const styles = theme => ({});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snackBarOpen: false,
      snackBar: { snackbarMessage: "", snackbarVariant: "info" },
      isLogged: true,
      loggingOffLoad: false,
      loadingScreen: false,
      Email: "",
      Password: ""
    };

    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackBarOpen: false });
  };
  
  // Inputs for the sign in form
  handleChange = name => event => {
    event.preventDefault();
    this.setState({ [name]: event.target.value });
  };

  // Logging out of the system
  handleLogout = async () => {
    this.setState({ loggingOffLoad: true });
    const response = await UserRequests.GETsignOut();
    if (response.data.status === "Success") {
      this.setState({ isLogged: false });
      let snackBar = {
        snackbarMessage: "Logged out successfully.",
        snackbarVariant: "success"
      };
      this.setState({ snackBar, snackBarOpen: true });
    }
    this.setState({ loggingOffLoad: false });
  };


  // this submits the sign in credentials to the POST SIGN IN script 
  handleSubmit = async () => {
    const { Email, Password } = this.state;
    this.setState({ loadingScreen: true });
    const response = await UserRequests.POSTsignIn(Email, Password);

    // Sets the localStorage 
    if (response.statusText === "OK") {
      this.setState({ isLogged: true });
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("username", response.data.data.first_name);
    } else {
      // Snackbar message if bad
      let snackBar = {
        snackbarMessage: response.data.message,
        snackbarVariant: "error"
      };
      this.setState({ snackBar, snackBarOpen: true });
    }
    this.setState({ loadingScreen: false });
  };

  render() {
    const {
      Email,
      Password,
      loadingScreen,
      loggingOffLoad,
      isLogged,
      snackBar,
      snackBarOpen
    } = this.state;

    return (
      <MuiThemeProvider theme={theme}>

        <div style={{ height: "100%" }}>

      {/* There are two types of snackbars funnelled into this one  */}
      {/* Successfully logged out, and error signing in */}
          <CustomizedSnackbars
            message={snackBar.snackbarMessage}
            variant={snackBar.snackbarVariant}
            snackbarOpen={snackBarOpen}
            snackbarClose={this.handleCloseSnackbar}
          />

          {/* If the user's signin credentials are correct, isLogged will be true. If false they will remain */}
          {/* on Login page via isLogged = false */}
          {isLogged ? (
            <MapPage loggingOff={loggingOffLoad} onLogout={this.handleLogout} />
          ) : (
            <LoginPage
              loading={loadingScreen}
              siginIn={this.handleSubmit}
              input={this.handleChange}
              Email={Email}
              Password={Password}
            />
          )}
        </div>
      </MuiThemeProvider>
      // <Testing />
    );
  }
}
App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
