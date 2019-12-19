import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import contactRequests from "../../../../../../services/Requests/Version2/BuildingContactTaskAPICalls";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  PaperRoot: {
    ...theme.mixins.gutters(),
    padding: `0px 0% 5px 0%`,
    width: `95%`,
    margin: `auto`,
    boxShadow: `none`,
  },
  buttonsPadding: {
    paddingTop: `10px`,
  },
  FormContainer: {
    padding: `9px 0% 10px 0%`
  }
});
class HistoryForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, handleChange, index, numOfRecords } = this.props;

    // InputNames, handleChange, handleSubmit,

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <form className={classes}>
            <Grid container className={classes.FormContainer}>
              <Paper className={classes.PaperRoot}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    id="outlined-uncontrolled"
                    label="Index"
                    value={index}
                    // onChange={handleChange("index")}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin="normal"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    id="outlined-uncontrolled"
                    label="Number of records"
                    type="number"
                    value={numOfRecords}
                    // onChange={handleChange("numOfRecords")}
                    className={classes.textField}
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
                <Grid
                  className={classes.buttonsPadding}
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="left"
                >
                  <Grid item xs={2}>
                    <Button
                      //   disabled={this.state.submitDisabled}
                      variant={"contained"}
                      color={"secondary"}
                      fullWidth={true}
                      //   onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </form>
        </Grid>
      </div>
    );
  }
}

HistoryForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryForm);
