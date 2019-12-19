import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import IntegrationReactSelect from "../contactForms/formComponents/GetAutocOmplete";
import ContactRequests from "../../../../../../services/Requests/Version2/BuildingContactTaskAPICalls";

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
  WarningheaderStyle: {
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
  PaperRoot: {
    ...theme.mixins.gutters(),
    padding: `0px 0% 30px 0%`,
    width: `95%`,
    margin: `auto`,
    marginTop: `3%`,
    paddingTop: `30px`
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
class DeleteValidation extends React.Component {
  constructor(props) {
    super(props);
 
  }

  state = {
    single: null,
    multi: null,
    data: [{}]
  };
 

  render() {
    const { handleSubmit, CloseModal, classes } = this.props;

    return (
        // CONTACT FORM DELETE CONTACT FROM TABLE 
      <div className={classes.root}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={12} className={classes.WarningheaderStyle}>
            <Typography
              align="center"
              variant="h4"
              className={classes.textWhite}
            >
              Are you sure you want to Delete this contact?
            </Typography>
          </Grid>
          <Grid container className={classes.FormContainer}>
          </Grid>
        </Grid>
        <Grid
          className={classes.buttonsPadding}
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Button variant={"contained"} fullWidth={true} onClick={CloseModal}>
              Close
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant={"contained"}
              fullWidth={true}
              onClick={handleSubmit}
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

DeleteValidation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteValidation);
