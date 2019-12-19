import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

const contactTypes = [
  {
    value: "Building manager",
    label: "Building manager"
  },
  {
    value: "Project manager",
    label: "Project manager"
  },
  {
    value: "Reception",
    label: "Reception"
  },
  {
    value: "Building contact",
    label: "Building contact"
  }
];

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  headerStyle: {
    padding: `35px 0px 35px 0px `,
    borderBottom: `13px solid #747db1`,
    background: `#3f51b5`
  },

  SuccessfulHeaderStyle: {
    padding: `35px 0px 35px 0px `,
    borderBottom: `13px solid #85ac91`,
    background: `#469a5f`
  },
  textWhite: {
    color: `white`
  },
  PaperRoot: {
    ...theme.mixins.gutters(),
    padding: `0px 0% 30px 0%`,
    width: `95%`,
    margin: `auto`,
    marginTop: `3%`,
  },
  buttonsPadding: {
    paddingBottom: `30px`
  },
  FormContainer: {
    padding: `9px 0% 34px 0%`
  },
  tickIcon: {
    fontSize: `30px`,
    marginRight: `15px`
  },
	widths: {
		maxHeight: 'fit-content',
		margin: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '-webkit-fill-available'
		},
		[theme.breakpoints.up('md')]: {
			width: '-webkit-fill-available'
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: '900px'
		}
	}
});
class UpdateContactForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      InputNames,
      handleChange,
      handleSubmit,
      handleContactTasksMenu,
      classes,
      CloseModal
    } = this.props;

    return (
      // UPDATE IN CONTACT TABLE 
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
              Contact Update Form
            </Typography>
          </Grid>
          <form className={classes.widths}>
            <Grid container className={classes.FormContainer}>
              <Paper className={classes.PaperRoot}>
                <Grid item xs={12}>
                  <TextField
                    required={true}
                    fullWidth={true}
                    id="outlined-name"
                    label="First name"
                    className={classes.textField}
                    value={InputNames.FirstName}
                    onChange={handleChange("FirstName")}
                    margin="normal"
                    variant="standard"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    required={true}
                    id="outlined-uncontrolled"
                    label="Last name"
                    className={classes.textField}
                    value={InputNames.LastName}
                    onChange={handleChange("LastName")}
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    required={true}
                    id="outlined-email-input"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="email"
                    value={InputNames.Email}
                    onChange={handleChange("Email")}
                    autoComplete="email"
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    id="outlined-uncontrolled"
                    label="Mobile number"
                    value={InputNames.MobileNumber}
                    onChange={handleChange("MobileNumber")}
                    type="text"
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
                    label="Phone number"
                    value={InputNames.PhoneNumber}
                    onChange={handleChange("PhoneNumber")}
                    className={classes.textField}
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth={true}
                    required={true}
                    id="standard-select-contactType"
                    select
                    label="Select"
                    value={InputNames.ContactTypes}
                    onChange={handleChange("ContactTypes")}
                    fullWidth={true}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="Please select contact type"
                    margin="normal"
                  >
                    {contactTypes.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
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
              onClick={CloseModal}
            >
              Close
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

UpdateContactForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpdateContactForm);
