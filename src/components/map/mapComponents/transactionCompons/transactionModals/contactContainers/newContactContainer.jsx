import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CreateNewContact from "../contactForms/createNewContact";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormSubmission from "../formSubmission";
import Paper from "@material-ui/core/Paper";
import LoadingIcon from "../../../../../animations/loadingIcon";
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
  widths: {
    maxHeight: "fit-content",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    },
    [theme.breakpoints.up("md")]: {
      width: "90%"
    },
    [theme.breakpoints.up("lg")]: {
      width: "900px"
    }
  }
});

class NewContactContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackToTasks = this.handleBackToTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isSuccessful: false,
    formStatus: "",
    formMessage: "",
    FormSubmitted: "default",
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNumber: "",
    PhoneNumber: "",
    ContactTypes: "ContactTypes"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async () => {
    this.setState({ FormSubmitted: "validating" });
    const {
      FirstName,
      LastName,
      Email,
      MobileNumber,
      PhoneNumber,
      ContactTypes
    } = this.state;

    const response = await contactRequests.POSTnewBuildingContact(
      FirstName,
      LastName,
      Email,
      MobileNumber,
      PhoneNumber,
      ContactTypes
    );

    this.setState({
      formStatus: response.status,
      formMessage: response.message
    });

    if (response)
      return this.setState({ FormSubmitted: "successful", isSuccessful: true });
    return this.setState({ FormSubmitted: "default", isSuccessful: false });
  };

  handleBackToTasks = () => {
    this.setState({ FormSubmitted: `default` });
  };

  render() {
    const { NewContactFormData, FormSubmitted, isSuccessful } = this.state;
    const { classes, BackToContactTasksMenu } = this.props;
    return (
      <React.Fragment>
        {/* this component will render the new contact form with a conditional render with if success change to Success */}
        {FormSubmitted === `default` ? (
          <CreateNewContact
            classes={classes}
            InputNames={this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleContactTasksMenu={BackToContactTasksMenu}
          />
        ) : FormSubmitted === `validating` ? (
          <Grid container className={classes.widths}>
            <Paper className={classes.widths}>
              <Grid item xs={12} className={classes.headerStyle}>
                <Typography
                  align="center"
                  variant="h4"
                  className={classes.textWhite}
                >
                  Contact Create Form
                </Typography>
              </Grid>
              <div style={{ paddingTop: `35px`, paddingBottom: `20px` }}>
                <LoadingIcon IconSubText={``} />
              </div>
            </Paper>
          </Grid>
        ) : FormSubmitted === `successful` ? (
          // this is shown when submission is succesful
          <FormSubmission
            formStatus={this.state.formStatus}
            formMessage={this.state.formMessage}
            isSuccessful={isSuccessful}
            returnBack={this.handleBackToTasks}
          />
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
}

NewContactContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewContactContainer);
