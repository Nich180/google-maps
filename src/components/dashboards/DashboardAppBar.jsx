import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import "../../App.css";
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },

  palette: {
    primary: {
      main: "#2196f3"
    },
    secondary: {
      main: "#CE1867"
    }
  }
});

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const Margin = {};

class DashboardAppBar extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };

  constructor(props) {
    super(props);
    this.state = { searchBoxActive: false };
    this.handleSearchToggle = this.handleSearchToggle.bind(this);
  }

  handleSearchToggle() {
    this.setState(state => ({
      searchBoxActive: !state.searchBoxActive
    }));
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleChange = event => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar
            className="app-bar"
            color="primary"
            style={{ boxShadow: "0px 0px 0px 0px white" }}
            position="static"
          >
            <Toolbar variant="dense" style={Margin}>
              <div style={{ width: "calc(100%)", textAlign: "-webkit-center" }}>
                <Typography variant="h5" color="inherit" noWrap>
                  Building List
                </Typography>
              </div>
              <div className="grow" />
            </Toolbar>
          </AppBar>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(DashboardAppBar);
