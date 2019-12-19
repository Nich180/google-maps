import React from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  heightBalance: { maxHeight: `fit-content`, margin: `auto`, tabIndex: `-1` }
});

class CreateOwnerButton extends React.Component {
  constructor(props) {
    super(props);

    this.handleOpenOwner = this.handleOpenOwner.bind(this);
  }

  state = {
    creationForm: false
  };

  handleOpenOwner = e => {
    localStorage.setItem("contactId", e);
    this.setState({ creationForm: true });
  };

  render() {
    const { propHandle, checked } = this.props;

    return (
      <React.Fragment>
        <Button
          onClick={this.handleOpenOwner}
          variant={"contained"}
          color={"secondary"}
        >
          New owner
        </Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.creationForm}
          onClose={this.handleDeleteClose}
        >
          <Paper>create owner</Paper>
        </Modal>
      </React.Fragment>
    );
  }
}

CreateOwnerButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateOwnerButton);
