import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import ContactTypes from "./transactionItemSelection/contactTypes";
import ContactsIcon from "@material-ui/icons/Contacts";
import ListIcon from "@material-ui/icons/List";
import ScheduleIcon from "@material-ui/icons/Schedule";
import HistoryForm from "./historyComponents/forms/HistoryForm";
import HistoryEnhancedTable from "./historyComponents/minorComponents/HistoryTable";
import Typography from "@material-ui/core/Typography";
import { ListItemIcon } from "@material-ui/core";

import Request from "../../../../services/Requests/Version2/HistoryAPICalls";

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: "white"
  },
  headerStyle: {
    padding: `40px 50px 40px 50px`,
    borderBottom: `13px solid #747db1`,
    background: `#3f51b5`
  },

  textWhite: {
    color: `white`
  },
  marginAuto: {
    overflow: `auto`,
    margin: `auto`
  },
  bottomSpacing: {
    marginBottom: `25px`,
    marginTop: `25px`
  },
  maxWid: {
    maxWidth: `100%`
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

function HistoryInputs(props) {
  const { goToContactWindow, classes, exitModal } = props;
  return (
    <React.Fragment>
      <Grid container className={classes.widths}>
        <Grid item xs={12} onClick={exitModal} className={classes.headerStyle}>
          <button id="close-red-button">close</button>
          <Typography align="center" variant="h4" className={classes.textWhite}>
            History
          </Typography>
        </Grid>
        <Grid
          item
          xs={11}
          className={`${classes.marginAuto} ${classes.bottomSpacing}`}
        >
          <HistoryEnhancedTable />
        </Grid>
        {/* <Grid item xs={10} className={classes.marginAuto}>
          <HistoryForm />
        </Grid> */}
        <br />
      </Grid>
    </React.Fragment>
  );
}

class HistoryIndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      windowState: "HistoryInputs",
      index: 0,
      numOfRecords: 100
    };

    this.handleContactWindow = this.handleContactWindow.bind(this);
    this.handleTasksWindow = this.handleTasksWindow.bind(this);

    this.handleChange = this.handleChange.bind(this);
  }

  //Feed to child component to take back to main menu
  handleTasksWindow = () => {
    this.setState({ windowState: "TaskOptions" });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    console.log(this.state);
  };

  handleSubmit = () => {
    this.setState({ FormSubmitted: true });
    console.log(this.state);
  };

  //Feed to main menu to take user to next {taskname} window
  handleContactWindow = () => {
    this.setState({ windowState: "ContactTasks" });
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, exitModal } = this.props;
    const { windowState, numOfRecords, index } = this.state;

    return (
      <React.Fragment>
        <Grid
          className={classes.root}
          container
          direction="column"
          justify="center"
        >
          <Grid item className={classes.maxWid}>
            {windowState === "HistoryInputs" ? (
              <HistoryInputs
                handleOnChange={this.handleChange}
                index={index}
                numOfRecords={numOfRecords}
                exitModal={exitModal}
                classes={classes}
                goToContactWindow={this.handleContactWindow}
              />
            ) : windowState === "ContactTasks" ? (
              <ContactTypes BackToTasksWindow={this.handleTasksWindow} />
            ) : null}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

HistoryIndexPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryIndexPage);
