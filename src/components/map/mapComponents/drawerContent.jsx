import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import grey from "@material-ui/core/colors/grey";
import BuildingInfoDrawers from "./buildInfoDrawers";
import BuildingInfoHeader from "./buildingInfoHeader";

const materialWhite = grey[50];

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  bluePaper: {
    background: "#2196f3"
  },
  paperCenter: {
    textAlign: "center"
  },
  font: {
    color: materialWhite
  },
  customSpacing: {
    marginBottom: "5px"
  }
});

class BuildingData extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, name, address, CloseDrawer } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          {/* This header includes the buttons, image, and title */}
          <BuildingInfoHeader CloseDrawer={CloseDrawer} name={name} address={address}  />

          {/* This is the main content underneath the header with primary info, etc */}
          <Grid item xs={12} style={{ width: "0px" }}>
            <BuildingInfoDrawers />
          </Grid>
        </Grid>
      </div>
    );
  }
}

BuildingData.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BuildingData);
