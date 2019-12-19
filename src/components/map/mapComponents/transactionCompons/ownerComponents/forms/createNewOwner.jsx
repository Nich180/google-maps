import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
    padding: `0px 0% 30px 0%`,
    width: `95%`,
    margin: `auto`,
    marginTop: `3%`
  },
  buttonsPadding: {
    paddingBottom: `30px`
  },
  FormContainer: {
    padding: `9px 0% 34px 0%`
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
      minWidth: "900px"
    }
  },
  heading: {
	fontSize: theme.typography.pxToRem(15),
	fontWeight: theme.typography.fontWeightRegular
  },
});
class CreateNewOwner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleSubmit,
      handleChange,
      InputNames,
      handleContactTasksMenu,
      classes
    } = this.props;

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
              Create New Owner Form
            </Typography>
          </Grid>
          <form className={classes.widths}>
            <Grid container className={classes.FormContainer}>
              <Paper className={classes.PaperRoot}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="standard-name"
                    label="Name"
                    className={classes.textField}
                    value={InputNames.name}
                    onChange={value => handleChange(value)}
                    margin="normal"
                  />
                </Grid>
                <br />
                <Grid item xs={12}>
                  <ExpansionPanel className={classes.noShaodw}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>
                        Tooltip
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography variant={"body1"}>
                        Type in the name of the owner, to which will then be
                        submitted to a list of owners that can be assigned to a
                        building.
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </Grid>
              </Paper>
            </Grid>
          </form>
        </Grid>
        <Grid
          className={classes.buttonsPadding}
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Button
              variant={"contained"}
              fullWidth={true}
              onClick={handleContactTasksMenu}
            >
              Back to tasks
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant={"contained"}
              color={"secondary"}
              fullWidth={true}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CreateNewOwner.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateNewOwner);
