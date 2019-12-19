import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// MODAL CHOICES FOR CONTACT TASKS
import ContactModificationOptions from "./contactTypesContainer";
// import DeleteContact from "../transactionModals/contactContainers/deleteContactContainer";
// import GetAllContactsContainer from "../transactionModals/contactContainers/getAllContactContainer";
// import NewContactContainer from "../transactionModals/contactContainers/newContactContainer";
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class ContactTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true, windowState: "ContactTasks" };

    this.handleGoToModifyMenu = this.handleGoToModifyMenu.bind(this);
    this.handleGoToUpdateMenu = this.handleGoToUpdateMenu.bind(this);
    this.handleContactDefault = this.handleContactDefault.bind(this);
    this.handleGoToGetAllMenu = this.handleGoToGetAllMenu.bind(this);
  }

  handleContactDefault = () => {
    this.setState({ windowState: "ContactTasks" });
  };

  handleGoToCreateType = () => {
    this.setState({ windowState: "CreateType" });
  };

  handleGoToDeleteType = () => {
    this.setState({ windowState: "DeleteType" });
  };

  handleGoToUpdateType = () => {
    this.setState({ windowState: "UpdateType" });
  };

  render() {
    const { windowState } = this.state;
    const { classes, BackToTasksWindow } = this.props;
    return (
      <React.Fragment>
        {/* in the file it renders all the options to select from within the Transaction - Contacts 
            Options include Create, Delete, and Get all.
        */}
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="center"
        >
          {/* Default state, main menu */}
          {windowState === "ContactTasks" ? (
            <ContactModificationOptions
              BackToTasksWindow={BackToTasksWindow}
              GoToUpdate={this.handleGoToUpdateType}
              GoToDelete={this.handleGoToDeleteType}
              GoToCreate={this.handleGoToCreateType}
              classes={classes}
            />
          ) : // Window setting for the update menu
          windowState === "CreateType" ? (
            <NewContactContainer
              BackToContactTasksMenu={this.handleContactDefault}
            />
          ) : // Window setting for the update menu
          windowState === "UpdateType" ? (
            <GetAllContactsContainer
              BackToContactTasksMenu={this.handleContactDefault}
            />
          ) : windowState === "DeleteType" ? (
            <DeleteContact BackToContactTasksMenu={this.handleContactDefault} />
          ) : (
            //Return FALSE
            <div> Null </div>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

ContactTypes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactTypes);
