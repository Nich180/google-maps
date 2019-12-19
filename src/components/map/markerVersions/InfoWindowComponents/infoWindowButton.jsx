import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, MuiThemeProvider } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import InfoIcon from "@material-ui/icons/Info";

import BuildingData from "../../mapComponents/drawerContent";

const styles = theme => ({
  stylized: {
    width: "-webkit-fill-available"
  },
  list: {
    width: 500
  },
  fullList: {
    width: "auto"
  },
  labelRoot: {
    color: "white"
  },
  header: {
    marginTop: "10%",
    marginBottom: "5%",
    color: "white"
  },
  FilterModal: {
    width: "50%",
    margin: "auto"
  },
  leftIcon: {
    marginRight: "10px"
  },
  widths: {
    height: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available"
    },
    [theme.breakpoints.up("md")]: {
      width: "400px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "600px"
    }
  }
});

class InfoWindowButton extends Component {
  constructor(props) {
    super(props);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  state = {
    openModal: false,
    left: false,
    open: false,
    modalTitle: ""
  };

  componentDidMount() {
    this.setState({
      left: false,
      open: false
    });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleOpenModal = title => {
    this.setState({ modalTitle: title, openModal: true });
  };

  render() {
    const { buildingData, classes, name, address } = this.props;

    return (
      <React.Fragment>
        {/* Menu icon to open left drawer */}
        <Button
          color={"primary"}
          fullWidth
          variant={"contained"}
          onClick={this.toggleDrawer("left", true)}
        >
          Info
        </Button>

        {/* Menu Drawer on the left side */}
        <SwipeableDrawer
          className={classes.stylized}
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
          swipeAreaWidth={2}
        >
          <div className={classes.widths} tabIndex={0} role="button">
            <BuildingData
              CloseDrawer={this.toggleDrawer}
              name={name}
              address={address}
            />
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    );
  }
}

InfoWindowButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InfoWindowButton);
