import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LoadingIcon from "../../animations/loadingIcon";
import UserRequests from "../../../services/Requests/Version2/UserAPICalls";
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
    paddingTop: `10px`,
    paddingBottom: `28px`
  },
  FormContainer: {
    padding: `9px 0% 34px 0%`
  },
  tickIcon: {
    fontSize: `30px`,
    marginRight: `15px`
  }
});

function ContactNewForm(props) {
  const {
    classes,
    handleSubmit,
    stateData,
    handleCLoseRequestForm,
    handleChange
  } = props;

  const { RequestForm } = stateData;
  return (
    <div className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="stretch">
        <Grid item xs={12} className={classes.headerStyle}>
          <Typography align="center" variant="h4" className={classes.textWhite}>
            Create an account
          </Typography>
        </Grid>
        <form>
          <Grid container className={classes.FormContainer}>
            <Paper className={classes.PaperRoot}>
              {RequestForm.map(Input => (
                <Grid item xs={12} key={Input.valueName}>
                  <TextField
				  	required={true}
                    fullWidth={true}
                    id={Input.id}
                    label={Input.label}
                    onChange={handleChange(Input.valueName)}
                    value={RequestForm.valueName}
                    className={classes.textField}
                    type={Input.type}
                    name={Input.type}
                    margin="normal"
                    variant="standard"
                  />
                </Grid>
              ))}
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
            color={"default"}
            fullWidth={true}
            onClick={handleCLoseRequestForm}
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

class RequestAccount extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    FormState: "FormInputs",
    Admin: false,
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Phone: "",

    RequestForm: [
      {
        id: "outlined-uncontrolled",
        type: "text",
        label: "First Name",
        valueName: "FirstName"
      },
      {
        id: "outlined-uncontrolled",
        type: "text",
        label: "Last Name",
        valueName: "LastName"
      },
      {
        id: "outlined-email-input",
        type: "email",
        label: "Email",
        valueName: "Email"
      },
      {
        id: "outlined-password-input",
        type: "password",
        label: "Password",
        valueName: "Password"
      },
      {
        id: "outlined-uncontrolled",
        type: "text",
        label: "Phone",
        valueName: "Phone"
      }
    ]
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async () => {
    this.setState({ FormState: "Submitting" });
    const { Admin, FirstName, LastName, Email, Password, Phone } = this.state;
    const response = await UserRequests.POSTcreateAccount(
      Admin,
      FirstName,
      LastName,
      Email,
      Password,
      Phone
    );
    if (response) {
      this.setState({ FormState: "Successful" });
    } else {
      this.setState({ FormState: "FormInputs" });
    }
  };

  render() {
    const { FormState } = this.state;
    const { classes, closeModal } = this.props;
    return (
      <React.Fragment>
        {FormState === "FormInputs" ? (
          <ContactNewForm
            classes={classes}
            stateData={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleCLoseRequestForm={closeModal}
          />
        ) : FormState === "Submitting" ? (
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
                  Create an account
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{ paddingTop: `40px`, paddingBottom: `25px` }}>
                  <LoadingIcon IconSubText={"Validating form submission"} />
                </div>
              </Grid>
            </Grid>
          </div>
        ) : FormState === "Successful" ? (
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
                  onClick={closeModal}
                >
                  <ArrowBackIos />
                  Close
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div> error try again</div>
        )}
      </React.Fragment>
    );
  }
}

RequestAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequestAccount);
