import RequestAccount from "../formTypes/requestAccount";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  GridRoot: {
    margin: 'auto',
    height: `100%`,
    left: "-9%",
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "950px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "750px"
    }
  },

  modalTitle: {
    backgroundImage: "linear-gradient(141deg, #0286de 51%, #2196f3 75%)",
    padding: "1.25%",
    boxShadow: "-2px 14px 0px -6px #3333335e",
    position: "absolute",
    top: "-45px",
    width: " 65%"
  },

  PaperRoot: {
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      width: "100%"
    },
    [theme.breakpoints.up("md")]: {
      height: "fit-content",
      width: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      height: "fit-content",
      width: "100%"
    }
  },
  DivRoot: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 1300
  },
  reqForm: {
    width: "100%"
  }
});

class ReqFormModal extends Component {

  render() {
    const { classes, loginMessage } = this.props;

    return (
      <Grid
        tabIndex="-1"
        container
        alignItems="center"
        justify="center"
        className={classes.GridRoot}
      >
        {/**
         * !This is the title for the request account modal
         **/}
        <Paper className={classes.PaperRoot} elevation={1}>
          {/* Title of the modal */}

          {/* Request Form */}
          <Grid item className={classes.reqForm}>
            <RequestAccount closeModal={loginMessage} />
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

ReqFormModal.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReqFormModal);
