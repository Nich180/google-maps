import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ContactTypes from "./transactionItemSelection/contactTypes";
import JobTypes from "./transactionItemSelection/jobTypes";
import StatusTypes from "./transactionItemSelection/statusTypes";
import OwnerTypes from "./transactionItemSelection/ownerTypes";
import QuoteTypes from "./transactionItemSelection/quoteTypes";
import ContactsIcon from "@material-ui/icons/Contacts";
import StatusIcon from "@material-ui/icons/HowToReg";
import ListIcon from "@material-ui/icons/List";
import QuoteIcon from "@material-ui/icons/Assignment";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Typography from "@material-ui/core/Typography";
import { ListItemIcon } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "white"
  },
  headerStyle: {
    padding: `40px 50px 40px 50px`,
    marginBottom: `1.5%`,
    borderBottom: `13px solid #747db1`,
    background: `#3f51b5`
  },

  textWhite: {
    color: `white`
  },

  OptionsPadding: {
    padding: `0px 0px 13px 0px`
  },
  widths: {
    maxHeight: "fit-content",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available"
    },
    [theme.breakpoints.up("md")]: {
      width: "-webkit-fill-available"
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: "600px"
    }
  }
});

function TaskWindow(props) {
  const {
    goToStatusWindow,
    goToContactWindow,
    goToQuotesWindow,
    goToJobsWindow,
    goToOwnersWindow,
    classes,
    exitModal
  } = props;
  return (
    <React.Fragment>
      <Grid container className={classes.widths}>
        <Grid item xs={12} onClick={exitModal} className={classes.headerStyle}>
          <button id="close-red-button">close</button>
          <Typography align="center" variant="h4" className={classes.textWhite}>
            Tasks
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.OptionsPadding}>
          <List component="nav">
            <Divider variant="middle" />
            <ListItem button onClick={goToStatusWindow}>
              <ListItemIcon>
                <StatusIcon />
              </ListItemIcon>
              <ListItemText inset primary="Status" />
            </ListItem>
            <Divider variant="middle" />
            <ListItem button onClick={goToContactWindow}>
              <ListItemIcon>
                <ContactsIcon />
              </ListItemIcon>
              <ListItemText inset primary="Contacts" />
            </ListItem>
            <Divider variant="middle" />
            <ListItem button onClick={goToQuotesWindow}>
              <ListItemIcon>
                <QuoteIcon />
              </ListItemIcon>
              <ListItemText inset primary="Quotes" />
            </ListItem>
            <Divider variant="middle" />
            <ListItem button onClick={goToJobsWindow}>
              <ListItemIcon>
                <ScheduleIcon />
              </ListItemIcon>
              <ListItemText inset primary="Jobs" />
            </ListItem>
            <Divider variant="middle" />
            <ListItem button onClick={goToOwnersWindow}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText inset primary="Owners" />
            </ListItem>
            <Divider variant="middle" />
          </List>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

class TransactionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: true, windowState: "TaskOptions" };

    this.handleContactWindow = this.handleContactWindow.bind(this);
    this.handleTasksWindow = this.handleTasksWindow.bind(this);
    this.handleOwnersWindow = this.handleOwnersWindow.bind(this);
    this.handleQuotesWindow = this.handleQuotesWindow.bind(this);
    this.handleStatusWindow = this.handleStatusWindow.bind(this);
    this.handleJobsWindow = this.handleJobsWindow.bind(this);
  }

  //Feed to child component to take back to main menu
  handleTasksWindow = () => {
    this.setState({ windowState: "TaskOptions" });
  };

  //Feed to main menu to take user to next {taskname} window
  handleStatusWindow = () => {
    this.setState({ windowState: "StatusTasks" });
  };

  //Feed to main menu to take user to next {taskname} window
  handleContactWindow = () => {
    this.setState({ windowState: "ContactTasks" });
  };

  //Feed to main menu to take user to next {taskname} window
  handleQuotesWindow = () => {
    this.setState({ windowState: "QuotesTasks" });
  };

  //Feed to main menu to take user to next {taskname} window
  handleJobsWindow = () => {
    this.setState({ windowState: "JobsTasks" });
  };

  //Feed to main menu to take user to next {taskname} window
  handleOwnersWindow = () => {
    this.setState({ windowState: "OwnersTasks" });
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, exitModal } = this.props;
    const { windowState } = this.state;

    return (
      <React.Fragment>
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="center"
        >
          <Grid item>
            {windowState === "TaskOptions" ? (
              <TaskWindow
                exitModal={exitModal}
                classes={classes}
                goToStatusWindow={this.handleStatusWindow}
                goToContactWindow={this.handleContactWindow}
                goToOwnersWindow={this.handleOwnersWindow}
                goToQuotesWindow={this.handleQuotesWindow}
                goToJobsWindow={this.handleJobsWindow}
                goToOwnersWindow={this.handleOwnersWindow}
              />
            ) : windowState === "StatusTasks" ? (
              <StatusTypes BackToTasksWindow={this.handleTasksWindow} />
            ) : windowState === "ContactTasks" ? (
              <ContactTypes BackToTasksWindow={this.handleTasksWindow} />
            ) : windowState === "QuotesTasks" ? (
              <QuoteTypes BackToTasksWindow={this.handleTasksWindow} />
            ) : windowState === "JobsTasks" ? (
              <JobTypes BackToTasksWindow={this.handleTasksWindow} />
            ) : windowState === "OwnersTasks" ? (
              <OwnerTypes BackToTasksWindow={this.handleTasksWindow} />
            ) : (
              <TaskWindow />
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

TransactionForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TransactionForm);
