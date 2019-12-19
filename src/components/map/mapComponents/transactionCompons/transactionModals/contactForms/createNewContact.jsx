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
  }
});
class CreateNewContact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitDisabled: false,
      selectDisabled: false,
      dataOptions: [],
      contactTypes: [
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
      ]
    };
  }

  async componentDidMount() {
    let options = [
      "Building manager",
      "Reception",
      "Project manager",
      "Building contact"
    ];
    let contactTypesHolder = [{}];

    //gets all the contacts
    const contacts = await contactRequests.GETallBuildingContacts();
    if (contacts !== null) {
      contactTypesHolder = contacts.map(contact => contact.contact_type);
    }

    //deletes unwanted seletors
    for (let i = 0; i < options.length; i++) {
      for (let ii = 0; ii < options.length; ii++) {
        if (options[i] === contactTypesHolder[ii]) delete options[i];
      }
    }

    let filteretedEmpties = [];
    for (let b = 0; b < options.length; b++) {
      if (options[b] !== undefined) filteretedEmpties.push(options[b]);
    }

    let contactOptions = [{}];
    for (let a = 0; a < filteretedEmpties.length; a++) {
      contactOptions.push({
        value: filteretedEmpties[a],
        label: filteretedEmpties[a]
      });
    }

    contactOptions.shift();

    if (contactOptions.length == 0)
      return (
        this.setState({ selectDisabled: true, submitDisabled: true }),
        alert("This buildings contact list has reached it's maximum count.")
      );

    this.setState({ contactTypes: contactOptions });
  }

  render() {
    const {
      InputNames,
      handleChange,
      handleSubmit,
      handleContactTasksMenu,
      classes
    } = this.props;

    const { contactTypes } = this.state;
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
              Contact Create Form
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
                    label="Phone number"
                    type="number"
                    value={InputNames.PhoneNumber}
                    onChange={handleChange("PhoneNumber")}
                    className={classes.textField}
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={this.state.selectDisabled}
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
              onClick={handleContactTasksMenu}
            >
              Back to tasks
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              disabled={this.state.submitDisabled}
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

CreateNewContact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateNewContact);
