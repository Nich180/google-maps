import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DeleteValidation from "../contactForms/deleteContactTable";
import DeleteSuccess from "../deleteSuccess";
import Paper from "@material-ui/core/Paper";
import ContactRequests from "../../../../../../services/Requests/Version2/BuildingContactTaskAPICalls";
import LoadingIcon from "../../../../../animations/loadingIcon";
const styles = theme => ({
  root: {
    flexGrow: 1
  },
  headerStyle: {
    padding: `35px 0px 35px 0px `,
    borderBottom: `13px solid #df7979`,
    background: `#ca1f1f`
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

class DeleteContactTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackToTasks = this.handleBackToTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isSuccessful: false,
    FormSubmitted: "defualt",
    DeleteContactFormData: {
      FirstName: "",
      LastName: "",
      Email: ""
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async () => {
    this.setState({ isSuccessful: "loading" });
    this.setState({ FormSubmitted: true });
    const response = await ContactRequests.DELETEsingleBuildingContact();
    this.props.onUpdate();

    if (response.status === "Success")
      return this.setState({ isSuccessful: "completed" });
    return this.setState({ isSuccessful: "default" });
  };

  handleBackToTasks = () => {
    this.setState({ FormSubmitted: "defualt" });
  };

  render() {
    const { DeleteContactFormData, FormSubmitted, isSuccessful } = this.state;
    const { classes, BackToContactTasksMenu, CloseModal } = this.props;
    return (
      // CONTACT CONTAINER FORM DELETE CONTACT FROM TABLE
      <React.Fragment>
        <Paper className={classes.PaperWidths}>
          {FormSubmitted === "defualt" ? (
            <DeleteValidation
              classes={classes}
              DeleteContactFormData={DeleteContactFormData}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              CloseModal={CloseModal}
            />
          ) : FormSubmitted === "loading" ? (
            <LoadingIcon />
          ) : (
            // this is shown when submission is succesful
            <DeleteSuccess
              isSuccessful={isSuccessful}
              CloseModal={CloseModal}
            />
          )}
        </Paper>
      </React.Fragment>
    );
  }
}

DeleteContactTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteContactTable);
