import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import MatButtons from "../../materialUiComponents/buttons";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({

  root: {
    [theme.breakpoints.down("xs")]: {
      overflow: "auto",
      height: "85%",
      position: "absolute",
      width: "100%",
      background: "white",
      margin: "auto",
    },
    [theme.breakpoints.between("sm", "md")]: {
      overflow: "auto",
      height: "60%",
      position: "absolute",
      width: "45%",
      background: "white",
      margin: "auto",
      overflowX: "auto"
    },

    [theme.breakpoints.up("lg")]: { 
      overflow: "auto",
      height: "75%",
      position: "absolute",
      width: "45%",
      background: "white",
      margin: "auto",
    }
  },
  blockDrop: {
    position: "fixed",
    zIndex: "0",
    top: "0",
    bottom: "0",
    right: "0",
    left: "0",
    height: "-webkit-fill-available",
    width: "-webkit-fill-available",
    background: "rgba(0, 0, 0, 0.5);"
  },
  newMarkerForm: {}
});

class NewBuildingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Displaying: "none",

      formPlaceholder: [
        {
          Name: "Building name",
          inputType: "text",
          key: "0"
        },
        {
          Name: "Postal code",
          inputType: "text",
          key: "1"
        },
        {
          Name: "Steet address",
          inputType: "text",
          key: "2"
        },
        {
          Name: "State",
          inputType: "text",
          key: "3"
        },
        {
          Name: "Building name",
          inputType: "text",
          key: "4"
        },
        {
          Name: "Building owner",
          inputType: "text",
          key: "5"
        }
      ]
    };
  }

  handClose = () => {
    this.setState({});
  };

  render() {
    const { formPlaceholder } = this.state;
    const { classes, openForm, closeForm } = this.props;

    return (
      <React.Fragment>
        <Modal hideBackdrop={false} open={openForm} className={classes.root}>
          <Grid
            className={classes.newMarkerForm}
            style={{
              background: "white",
              borderRadius: "5px",
              padding: "3%",
              boxShadow: "rgba(241, 241, 241, 0.73) 0px 5px 0px 4px"
            }}
            container
            justify="center"
            direction="row"
            spacing={16}
          >
            <Grid
              justify="center"
              alignItems="center"
              alignContent="center"
              container
              style={{ marginBottom: "15px" }}
            >
              <Grid item xs={12}>
                <Typography align={"center"} variant="h4" id="modal-title">
                  Create new building marker
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography
                  align={"center"}
                  variant="subtitle1"
                  id="modal-title"
                >
                  Fill in the following details to create a new building marker.
                </Typography>
                <Divider />
              </Grid>
            </Grid>
            {/* 
                !Renders dynamically the content within the form
             */}
            <Grid container justify="center" direction="row" style={{ marginBottom: "4%" }}>
              {formPlaceholder.map(entry => (
                <div
                  key={entry.key}
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    paddingRight: "2%"
                  }}
                >
                  <Grid item xs={12} style={{}}>
                  </Grid>
                </div>
              ))}
            </Grid>
            <Grid
              container
              justify="space-between"
              direction="row"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Button onClick={closeForm}> Cancel </Button>
              </Grid>
              <Grid item xs={6}>
                <Button style={{ float: "right" }}> Submit </Button>
              </Grid>
            </Grid>
          </Grid>
        </Modal>
        {/* <div className={classes.blockDrop}> block </div> */}
      </React.Fragment>
    );
  }
}

NewBuildingForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewBuildingForm);
