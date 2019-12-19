import React, { Component } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";

const styles = theme => ({
  root: {
    width: "100%",
    position: "absolute",
    zIndex: "1!important"
  },
  search: {
    position: "relative",
    [theme.breakpoints.down("md")]: {
      marginRight: theme.spacing.unit * 2,
      width: "100%!important",
      marginLeft: 0
    },
    [theme.breakpoints.up("md")]: {
      width: "35%!important",
      margin: `auto`
    }
  },

  toolbarRoot: {
    background: "rgb(33, 150, 243)"
  },

  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  FilterToggle: {
    [theme.breakpoints.down("sm")]: {
      bottom: "-4px",
      left: "-6px",
      position: "fixed",
      borderRadius: "8px",
      background: "rgb(33, 150, 243)",
      padding: "1%",
      paddingLeft: "4%"
    },
    [theme.breakpoints.up("md")]: {
      zIndex: 5,
      flex: "none",
      position: "absolute",
      left: "25px"
    }
  },
  welcomeUser: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    [theme.breakpoints.up("md")]: {
      display: "show",
      marginTop: "10px"
    }
  }
});

//Navigation Bar with the map page component
class MapNavBar extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    anchorEl: null,
    checkedA: true,
    mobileMoreAnchorEl: null
  };

  handleChange = name => event => {
    console.log(event);
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const {
      classes,
      onSingle,
      options,
      filterMenuData,
      onSelectChange,
      onLogout,
      InputChange,
      viewportBounds
    } = this.props;
    const { checkedA } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbarRoot}>
            <div className={classes.search}>
              {/* The search within the navigation bar allowing the user to type in words to retrieve get search/owners */}
              <SearchBar
                onSingle={onSingle}
                InputChange={InputChange}
                onSelectChange={onSelectChange}
                options={options}
                viewportBounds={viewportBounds}
                filterMenuData={filterMenuData}
                onLogout={onLogout}
              />
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MapNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MapNavBar);
