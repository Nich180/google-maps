import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Form from "../../../../forms/Form";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import request from "../../../../../services/Requests/Version1/xmlHttpReq";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

import Paper from "@material-ui/core/Paper";

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
    marginTop: `3%`
  },
  buttonsPadding: {
    paddingTop: `10px`
  },
  FormContainer: {
    padding: `9px 0% 34px 0%`
  },
  tickIcon: {
      fontSize: `30px`,
      marginRight: `15px`
  }
});

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

function ContactNewForm(props) {
  const {
    classes,
    FirstName,
    LastName,
    Email,
    MobileNumber,
    PhoneNumber,
    ContactTypes,
    handleSubmit,
    handleContactTasksMenu,
    handleChange
  } = props;
  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Grid item xs={12} className={classes.headerStyle}>
          <Typography align="center" variant="h4" className={classes.textWhite}>
            Contact Create Form
          </Typography>
        </Grid>
        <form>
          <Grid container className={classes.FormContainer}>
            <Paper className={classes.PaperRoot}>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  id="outlined-name"
                  label="First name"
                  className={classes.textField}
                  value={FirstName}
                  onChange={handleChange("FirstName")}
                  margin="normal"
                  variant="standard"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  id="outlined-uncontrolled"
                  label="Last name"
                  className={classes.textField}
                  value={LastName}
                  onChange={handleChange("LastName")}
                  margin="normal"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  id="outlined-email-input"
                  label="Email"
                  className={classes.textField}
                  type="email"
                  name="email"
                  value={Email}
                  onChange={handleChange("Email")}
                  autoComplete="email"
                  margin="normal"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth={true}
                  id="outlined-number"
                  label="Mobile number"
                  value={MobileNumber}
                  onChange={handleChange("MobileNumber")}
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
                  id="outlined-number"
                  label="Phone number"
                  value={PhoneNumber}
                  onChange={handleChange("PhoneNumber")}
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
                  id="standard-select-contactType"
                  select
                  label="Select"
                  value={ContactTypes}
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
            onClick={handleContactTasksMenu}
          >
            Back to tasks
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            variant={"contained"}
            color={"primary"}
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

class ContactType extends Form {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    FormSubmitted: false,
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNumber: 0,
    PhoneNumber: 0,
    ContactTypes: "ContactTypes"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ FormSubmitted: true });
    console.log(this.state);
  };

  render() {
    const {
      FormSubmitted,
      FirstName,
      LastName,
      Email,
      MobileNumber,
      PhoneNumber,
      ContactTypes
    } = this.state;
    const { classes, handleContactTasksMenu } = this.props;
    return (
      <React.Fragment>
        {FormSubmitted === false ? (
          <ContactNewForm
            classes={classes}
            handleContactTasksMenu={handleContactTasksMenu}
            FirstName={FirstName}
            LastName={LastName}
            Email={Email}
            MobileNumber={MobileNumber}
            PhoneNumber={PhoneNumber}
            ContactTypes={ContactTypes}
            handleContactDefault={this.handleContactDefault}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleContactTasksMenu={handleContactTasksMenu}
          />
        ) : (
          <div className={classes.root}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
            >
              <Grid item xs={12} className={classes.SuccessfulHeaderStyle}>
                <Typography
                  align="center"
                  variant="h4"
                  className={classes.textWhite}
                >
                  <CheckCircleOutline className={classes.tickIcon} />
                  Successfully submitted
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant={"contained"}
                  fullWidth={true}
                  onClick={handleContactTasksMenu}
                >
                <ArrowBackIos />
                  Back to tasks
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </React.Fragment>
    );
  }
}

ContactType.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ContactType);
