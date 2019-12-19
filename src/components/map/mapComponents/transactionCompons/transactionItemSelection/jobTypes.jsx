import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// MODAL CHOICES FOR CONTACT TASKS
import JobsTasksOptions from "../jobsComponents/containers/jobsTasksOptions";
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class JobTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true, windowState: "JobTasks" };

    this.handleStatusDefault = this.handleStatusDefault.bind(this);
    this.handleOverviewMenu = this.handleOverviewMenu.bind(this);
    this.handleContactsStatusMenu = this.handleContactsStatusMenu.bind(this);
  }

  handleStatusDefault = () => {
    this.setState({ windowState: "JobTasks" });
  };

  handleOverviewMenu = () => {
    this.setState({ windowState: "OverviewJobs" });
  };

  handleContactsStatusMenu = () => {
    this.setState({ windowState: "BuildingContactsJobs" });
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
          {windowState === "JobTasks" ? (
            <JobsTasksOptions
              BackToTasksWindow={BackToTasksWindow}
              classes={classes}
            />
          ) : (
            <div> Null </div>
          )}
        </Grid>
      </React.Fragment>
    );
  }
}

JobTypes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(JobTypes);
