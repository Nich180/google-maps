import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import EnhancedTable from "../getAllContacts/enhancedListsTable";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  headerStyle: {
    padding: `35px 0px 35px 0px `,
    borderBottom: `13px solid #747db1`,
    background: `#3f51b5`
  },
  textWhite: {
    color: `white`
  },
  PaperRoot: {
    ...theme.mixins.gutters(),
    padding: `0px 0% 0px 0%`,
    width: `95%`,
    margin: `auto`,
    marginTop: `1%`,
    minWidth: 1200,
    boxShadow: `none`
  },
  buttonsPadding: {
    paddingBottom: `35px`
  },
  FormContainer: {
    padding: `9px 0% 34px 0%`
  }
});
class GetAllContact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { returnBack, classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={12} className={classes.headerStyle}>
            <Typography
              align="center"
              variant="h4"
              className={classes.textWhite}
            >
              All building contacts
            </Typography>
          </Grid>
          <Grid container className={classes.FormContainer}>
            <Paper className={classes.PaperRoot}>
              <EnhancedTable />
            </Paper>
          </Grid>
        </Grid>
        <Grid
          className={classes.buttonsPadding}
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Button variant={"contained"} fullWidth={true} onClick={returnBack}>
              Back to tasks
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

GetAllContact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GetAllContact);
