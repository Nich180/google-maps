import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import UpdateContactForm from "../contactForms/updateContact";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import SuccessfulSubmission from "../successfulSubmission";
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

  SuccessfulHeaderStyle: {
    padding: `35px 0px 35px 0px `,
    borderBottom: `13px solid #85ac91`,
    background: `#469a5f`
  },
  textWhite: {
    color: `white`
  },
  PaperWidths: {
    maxHeight: "fit-content",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%"
    },
    [theme.breakpoints.between("md", "sm")]: {
      maxWidth: "fit-content"
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "900px"
    }
  }
});

class UpdateContact extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackToTasks = this.handleBackToTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isSuccessful: false,
    FormSubmitted: "default",
    FirstName: "",
    LastName: "",
    Email: "",
    MobileNumber: "",
    PhoneNumber: "",
    ContactTypes: "ContactTypes"
  };

  componentDidMount() {
    const { contactData } = this.props;
    this.setState({
      FirstName: contactData.first_name,
      LastName: contactData.last_name,
      Email: contactData.email,
      MobileNumber: contactData.mobile,
      PhoneNumber: contactData.phone,
      ContactTypes: contactData.contact_type
    });
  }

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
    const response = await contactRequests.PUTupdateBuildingContact(
      FirstName,
      LastName,
      Email,
      MobileNumber,
      PhoneNumber,
      ContactTypes
    );

    console.log(`response of backend PUTupdate ${response}`);

    if (response != "failed")
      return (
        this.setState({ FormSubmitted: "successful", isSuccessful: true }),
        this.props.onUpdate()
      );
    return this.setState({ FormSubmitted: "successful", isSuccessful: false });
  };

  handleBackToTasks = () => {
    this.setState({ FormSubmitted: `default` });
  };

  render() {
    const { FormSubmitted, isSuccessful } = this.state;
    const {
      classes,
      BackToContactTasksMenu,
      CloseModal,
      contactData
    } = this.props;
    return (
      <React.Fragment>
        <Paper className={classes.PaperWidths}>
          {/* this component will render the new contact form with a conditional 
          render with if success change to Success */}
          {FormSubmitted === `default` ? (
            <UpdateContactForm
              InputNames={this.state}
              handleChange={this.handleChange}
              CloseModal={CloseModal}
              handleSubmit={this.handleSubmit}
              handleContactTasksMenu={BackToContactTasksMenu}
            />
          ) : FormSubmitted === `validating` ? (
            <Paper>
              <Grid item xs={12} className={classes.headerStyle}>
                <Typography
                  align="center"
                  variant="h4"
                  className={classes.textWhite}
                >
                  Contact Update Form
                </Typography>
              </Grid>
              <div style={{ paddingTop: `35px`, paddingBottom: `20px` }}>
                <Typography variant={"h4"}>
                  Validating form submission.
                </Typography>
                <LoadingIcon />
              </div>
            </Paper>
          ) : FormSubmitted === `successful` ? (
            // this is shown when submission is succesful
            <SuccessfulSubmission
              isSuccessful={isSuccessful}
              returnBack={this.handleBackToTasks}
            />
          ) : (
            <div />
          )}
        </Paper>
      </React.Fragment>
    );
  }
}

UpdateContact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UpdateContact);
