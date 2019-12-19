import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GetAllOwner from "../forms/getAllForm";
import SubmissionResult from "../submissionResult";

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
  }
});

class GetAllContactContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackToTasks = this.handleBackToTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    FormSubmitted: false,
    GetAllData: {
      FirstName: "",
      LastName: "",
      Email: ""
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = () => {
    this.setState({ FormSubmitted: true });
  };

  handleBackToTasks = () => {
    this.setState({ FormSubmitted: false });
  };

  render() {
    const { GetAllData, FormSubmitted } = this.state;
    const { classes, BackToContactTasksMenu } = this.props;
    return (
      <React.Fragment>
        {FormSubmitted === false ? (
          <GetAllOwner
            classes={classes}
            DeleteContactFormData={GetAllData}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            returnBack={BackToContactTasksMenu}
          />
        ) : (
          // this is shdown when submission is succesful
          <SubmissionResult returnBack={BackToContactTasksMenu} />
        )}
      </React.Fragment>
    );
  }
}

GetAllContactContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GetAllContactContainer);
