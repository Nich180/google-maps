import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FilterModalContent from "./filterModalContent";

const styles = theme => ({
  GridRoot: {
    height: "100%"
  },

  PaperRoot: {
    height: "fit-content",
    background: "white!important",
    border: "none!important",
    boxShadow: "none!important",
    width: "100%",
    background: "white"
  },
  DivRoot: {
    width: "100%",
    position: "absolute",
    zIndex: 1600
  },
  reqForm: {
    width: "100%"
  },
  buttonsContainer: {
    padding: "2%"
  },
  saveButton: {
    right: 0,
    textAlign: "right"
  }
});

class FilterSettingsModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, closeFilter } = this.props;

    //  Parent component is Drawer.js
    // Parent drawer displays the Filter List > Buildings
    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        className={classes.GridRoot}
        tabIndex="-1"
      >
        <Paper className={classes.PaperRoot}>
         <FilterModalContent closeFilter={closeFilter} />
        </Paper>
      </Grid>
    );
  }
}

FilterSettingsModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterSettingsModal);
