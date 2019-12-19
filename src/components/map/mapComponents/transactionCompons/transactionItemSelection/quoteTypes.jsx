import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// MODAL CHOICES FOR CONTACT TASKS
import QuotesTasksOptions from "../quotesComponents/containers/quotesComponents";
const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class QuoteTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true, windowState: "QuoteTasks" };

    this.handleStatusDefault = this.handleStatusDefault.bind(this);
    this.handleOverviewMenu = this.handleOverviewMenu.bind(this);
    this.handleContactsStatusMenu = this.handleContactsStatusMenu.bind(this);
  }

  handleStatusDefault = () => {
    this.setState({ windowState: "QuoteTasks" });
  };

  handleOverviewMenu = () => {
    this.setState({ windowState: "OverviewQuotes" });
  };

  handleContactsStatusMenu = () => {
    this.setState({ windowState: "BuildingContactsQuotes" });
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
          {windowState === "QuoteTasks" ? (
            <QuotesTasksOptions
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

QuoteTypes.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(QuoteTypes);
