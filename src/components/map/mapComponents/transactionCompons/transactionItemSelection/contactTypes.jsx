import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// MODAL CHOICES FOR CONTACT TASKS
import ContactOptions from "../transactionModals/contactContainers/contactTasksMenuOptions";
import DeleteContact from "../transactionModals/contactContainers/deleteContactContainer";
import GetAllContactsContainer from "../transactionModals/contactContainers/getAllContactContainer";
import NewContactContainer from "../transactionModals/contactContainers/newContactContainer";
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

  handleGoToModifyMenu = () => {
    this.setState({ windowState: "ModifyTypes" });
  };

  handleGoToGetAllMenu = () => {
    this.setState({ windowState: "GetAll" });
  };

  handleGoToUpdateMenu = () => {
    this.setState({ windowState: "UpdateContact" });
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
            <ContactOptions
              BackToTasksWindow={BackToTasksWindow}
              handleUpdateMenu={this.handleGoToUpdateMenu}
              handleGetAllMenu={this.handleGoToGetAllMenu}
              GoToModifyMenu={this.handleGoToModifyMenu}
              classes={classes}
            />
          ) : // Window setting for the update menu
          windowState === "UpdateContact" ? (
            <NewContactContainer
              BackToContactTasksMenu={this.handleContactDefault}
            />
          ) : // Window setting for the update menu
          windowState === "GetAll" ? (
            <GetAllContactsContainer
              BackToContactTasksMenu={this.handleContactDefault}
            />
          ) : windowState === "ModifyTypes" ? (
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
