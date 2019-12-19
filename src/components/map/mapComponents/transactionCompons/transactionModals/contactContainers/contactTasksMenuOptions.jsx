import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

// MODAL CHOICES FOR CONTACT TASKS
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";

import UpdateIcon from "@material-ui/icons/Update";
import BallotIcon from "@material-ui/icons/Ballot";
import GetAllIcon from "@material-ui/icons/GetApp";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  index: { tabIndex: -1 },

  headerStyle: {
    padding: `30px 25px 25px 15px`,
    marginBottom: `15px`,
    borderBottom: `13px solid #747db1`,
    background: `#3f51b5`
  },

  textWhite: {
    color: `white`
  },

  buttonSpacing: {
    padding: `5px 15px 15px 15px`
  }
});

class ContactOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      BackToTasksWindow,
      handleUpdateMenu,
      handleGetAllMenu,
      GoToModifyMenu,
      classes
    } = this.props;

    return (
      <React.Fragment>
        {/* This component renders the list of options needed for the Contact Tasks */}
        <Grid container className={classes.index}>
          <Grid item xs={12} className={classes.headerStyle}>
            <Typography
              align="center"
              variant="h4"
              className={classes.textWhite}
            >
              Contact Tasks
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <List component="nav">
              <Divider variant="middle" />
              <ListItem button onClick={handleUpdateMenu}>
                <ListItemIcon>
                  <UpdateIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="Add contact"
                  secondary="create a new contact by filling in..."
                />
              </ListItem>
              <Divider variant="middle" />
              <ListItem button onClick={GoToModifyMenu}>
                <ListItemIcon>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="Contact types"
                  secondary="Modify contact types"
                />
              </ListItem>
              <Divider variant="middle" />
              <ListItem button onClick={handleGetAllMenu}>
                <ListItemIcon>
                  <GetAllIcon />
                </ListItemIcon>
                <ListItemText
                  inset
                  primary="View contacts"
                  secondary="View all contacts associated with building"
                />
              </ListItem>
              <Divider variant="middle" />
            </List>
          </Grid>
          <Grid item xs={5} className={classes.buttonSpacing}>
            <Button
              fullWidth={true}
              variant={"contained"}
              onClick={BackToTasksWindow}
            >
              Back to List
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

ContactOptions.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactOptions);
