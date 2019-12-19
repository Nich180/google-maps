import ForgotPassForm from "../formTypes/forgotPassForm";
import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  GridRoot: {
    padding: theme.spacing.unit,
    [theme.breakpoints.down("sm")]: {
      width: "250px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "450px"
    },
    [theme.breakpoints.up("lg")]: {
      width: "750px"
    }
  },

  PaperRoot: {
    background: "white!important",
    border: "none!important",
    boxShadow: "none!important",
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.down("sm")]: {
      height: "600px",
      width: "600px"
    },
    [theme.breakpoints.up("md")]: {
      height: "750px",
      width: "750px"
    },
    [theme.breakpoints.up("lg")]: {
      height: "auto",
      width: "650px"
    }
  },
  DivRoot: {
    width: "800px",
    height: "100%",
    position: "absolute",
    zIndex: 1300
  },
  reqForm: {
    width: "100%"
  }
});

class ForgotPassword extends Component {
  state = {};
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        spacing={12}
        alignItems="center"
        justify="center"
        className={classes.GridRoot}
      >
        <Paper className={classes.PaperRoot} elevation={1}>
          {/* Title of the modal */}
          <Grid item>
            <Typography variant="h4"> Forgot Password </Typography> 
          </Grid>

          {/* Request Form */}
          <Grid item className={classes.reqForm}>
            <ForgotPassForm />
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

ForgotPassword.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ForgotPassword);
