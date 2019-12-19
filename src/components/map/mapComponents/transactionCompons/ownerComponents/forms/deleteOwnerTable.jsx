import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import LoadingIcon from "../../../../../animations/loadingIcon";
import DeleteValidationOwner from "./deleteValidationOwner";
import DeleteSuccess from "../../transactionModals/deleteSuccess";
import BuildingOwnerRequests from "../../../../../../services/Requests/Version2/buildingOwnerApiCalls";
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

class DeleteOwnerTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackToTasks = this.handleBackToTasks.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    isSuccessful: false,
    FormSubmitted: "defualt"
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async () => {
    this.setState({ isSuccessful: null, FormSubmitted: "loading" });
    const response = await BuildingOwnerRequests.DELETEowner(
      localStorage.getItem("contactId")
    );

    if (response.data.status === "Success") {
       this.setState({ isSuccessful: true, FormSubmitted: "completed" });
    } else {
       this.setState({ isSuccessful: false, FormSubmitted: "completed" });
    }
    this.props.onUpdate();
  };

  handleBackToTasks = () => {
    this.setState({ FormSubmitted: "defualt" });
  };

  render() {
    const { FormSubmitted, isSuccessful } = this.state;
    const { classes, BackToContactTasksMenu, CloseModal } = this.props;
    return (
      // CONTACT CONTAINER FORM DELETE CONTACT FROM TABLE
      <React.Fragment>
        <Paper className={classes.PaperWidths}>
          {FormSubmitted === "defualt" ? (
            <DeleteValidationOwner
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

DeleteOwnerTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteOwnerTable);
