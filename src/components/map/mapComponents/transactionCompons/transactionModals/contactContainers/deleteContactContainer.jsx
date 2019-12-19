import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteContact from "../contactForms/deleteContact";
import SuccessfulSubmission from "../successfulSubmission";

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

class NewContactContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackToTasks = this.handleBackToTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isSuccessful: false,
    FormSubmitted: false,
    DeleteContactFormData: {
      FirstName: "",
      LastName: "",
      Email: ""
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ FormSubmitted: true, isSuccessful: true });
  };

  handleBackToTasks = () => {
    this.setState({ FormSubmitted: false });
  };

  render() {
    const { isSuccessful, DeleteContactFormData, FormSubmitted } = this.state;
    const { classes, BackToContactTasksMenu } = this.props;
    return (
      <React.Fragment>
        {FormSubmitted === false ? (
          <DeleteContact
            classes={classes}
            DeleteContactFormData={DeleteContactFormData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            returnBack={BackToContactTasksMenu}
          />
        ) : (
          // this is shown when submission is succesful
          <SuccessfulSubmission
            isSuccessful={isSuccessful}
            returnBack={BackToContactTasksMenu}
          />
        )}
      </React.Fragment>
    );
  }
}

NewContactContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewContactContainer);
