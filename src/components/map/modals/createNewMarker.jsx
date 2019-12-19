import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import MatButtons from "../../materialUiComponents/buttons";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import NewBuildingForm from "./newBuildForm";

const styles = theme => ({
  newMarkerModal: {
    borderRadius: "5px",
    boxShadow: "0px 3px 5px 1px rgba(137, 137, 137, 0.58)",
    background: "white",
    height: "fit-content",
    width: "fit-content",
    paddingTop: "1%",
    paddingBottom: "1%",
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    top: "7%"
  }
});

class CreateNewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isDisplaying: "none",
    };

    this.handleCloseMarkFormModal = this.handleCloseMarkFormModal.bind(this);
  }

  handleCloseMarkFormModal = () => {
    this.setState({ isOpen: false, isDisplaying: "none" });
  };

  handleAcceptNewMarker = () => {
    this.setState({ isOpen: true, isDisplaying: "show" });
  };

  render() {
    const { isOpen } = this.state;
    const {
      classes,
      openAlertNewMarkerModal,
      closeAlertNewMarkerModal
    } = this.props;

    return (
      <React.Fragment>
        {/* Modal Box whether Yes or No to create new building marker */}
        {/* <Modal
          hideBackdrop={true}
          open={openAlertNewMarkerModal}
          className={classes.newMarkerModal}
        >
          <Grid container justify="center" direction="row">
            <Grid item xs={12} style={{ marginBottom: "15px" }}>
              <Typography align={"center"} variant="h6" id="modal-title">
                Create a new building marker?
              </Typography>
            </Grid>

            <Grid container justify="center" direction="row" spacing={40}>
              <Grid item xs={4}>
                <MatButtons
                  FullWidth={true}
                  onClick={(event) => { this.handleAcceptNewMarker(); closeAlertNewMarkerModal(); }}
                  variant={"contained"}
                  text={"Yes"}
                  className={"AcceptButton"}
                />
              </Grid>

              <Grid item xs={4}>
                <MatButtons
                  Color={"secondary"}
                  FullWidth={true}
                  onClick={closeAlertNewMarkerModal}
                  variant={"outlined"}
                  text={"No"}
                />
              </Grid>
            </Grid>
          </Grid>
        </Modal> */}

        <NewBuildingForm
          isDisplaying={this.state.isDisplaying}
          closeForm={this.handleCloseMarkFormModal}
          openForm={isOpen}
        />
      </React.Fragment>
    );
  }
}

CreateNewForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateNewForm);
