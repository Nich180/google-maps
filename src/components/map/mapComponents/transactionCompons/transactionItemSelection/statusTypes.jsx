import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// MODAL CHOICES FOR CONTACT TASKS
import StatusTasksOptions from "../statusComponents/containers/statusTasksOptions";
import DeleteContact from "../transactionModals/contactContainers/deleteContactContainer";
import GetAllContactsContainer from "../transactionModals/contactContainers/getAllContactContainer";
import NewContactContainer from "../transactionModals/contactContainers/newContactContainer";
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class StatusTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true, windowState: "StatusTasks" };

    this.handleStatusDefault = this.handleStatusDefault.bind(this);
    this.handleOverviewMenu = this.handleOverviewMenu.bind(this);
    this.handleContactsStatusMenu = this.handleContactsStatusMenu.bind(this);
  }

  handleStatusDefault = () => {
    this.setState({ windowState: "StatusTasks" });
  };

  handleOverviewMenu = () => {
    this.setState({ windowState: "OverviewStatus" });
  };

  handleContactsStatusMenu = () => {
    this.setState({ windowState: "BuildingContactsStatus" });
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
          {windowState === "StatusTasks" ? (
            <StatusTasksOptions
              BackToTasksWindow={BackToTasksWindow}
              handleUpdateMenu={this.handleGoToUpdateMenu}
              handleGetAllMenu={this.handleGoToGetAllMenu}
              handleGoToDeleteMenu={this.handleGoToDeleteMenu}
              classes={classes}
            />
          ) : // Window setting for the update menu
          windowState === "OverviewStatus" ? (
            <NewContactContainer
              BackToContactTasksMenu={this.handleContactDefault}
            />
          ) : // Window setting for the update menu
          windowState === "BuildingContactsStatus" ? (
            <GetAllContactsContainer
              BackToContactTasksMenu={this.handleContactDefault}
            />
          ) : (
            //Return FALSE
            <div> Null </div>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

StatusTypes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StatusTypes);
