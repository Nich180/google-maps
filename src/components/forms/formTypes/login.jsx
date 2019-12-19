import React, { Component } from "react";
import PropTypes from "prop-types";

//Modal imports
import ReqFormModal from "../modals/reqFormModal";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";

//Material-ui imports
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

//request
import request from "../../../services/Requests/Version1/xmlHttpReq";

const styles = theme => ({
  ButtonsWidth: {
    [theme.breakpoints.down("sm")]: {
      width: "50%"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "49%"
    },
    [theme.breakpoints.down("lg")]: {
      width: "47%"
    }
  },

  //Forgot your password and request an account buttons
  responseButton: {
    [theme.breakpoints.down("sm")]: {
      width: "fit-content",
      height: "fit-content"
    },
    [theme.breakpoints.between("sm", "md")]: {},
    [theme.breakpoints.down("lg")]: {
      position: "absolute",
      right: "0px"
    }
  },

  LoginButton: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginTop: "5%",
      maxWidth: "100%"
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "45%",
      maxWidth: "47%",
      marginTop: "5%"
    },
    [theme.breakpoints.up("up")]: {
      width: "100%",
      marginTop: "5%!important"
    }
  },

  //Forgot your password and request an account buttons
  buttonOptions: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "4%",
      position: "relative",
      fontSize: "9px",
      width: "100%"
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "4%",
      width: "100%"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "5%",
      width: "100%"
    }
  },

  passwordInput: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "1%"
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "3%"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "5%"
    }
  },

  loginButton: {
    [theme.breakpoints.down("sm")]: {
      marginTop: "1%"
    },
    [theme.breakpoints.between("sm", "md")]: {
      marginTop: "1%",
      justifyContent: "center"
    },
    [theme.breakpoints.up("lg")]: {
      marginTop: "10%"
    }
  }
});
class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.onMessageReceived = this.onMessageReceived.bind(this);
  }

  state = {
    open: false
  };

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onMessageReceived = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSubmit = async parent => {};

  render() {
    const { classes, siginIn, input, Email, Password } = this.props;
    {
      /* button styles for the forgot and request account */
    }

    const { open } = this.state;

    return (
      //error checking is done in parent class (Form) in the handleSubmit
      <Grid container>
        <Grid item style={{ width: "100%" }}>
          <form>
            <Grid container direction={"column"}>
              <Grid item>
                <TextField
                  fullWidth={true}
                  id="outlined-uncontrolled"
                  label="Email"
                  type="email"
                  value={Email}
                  onChange={input("Email")}
                  margin="normal"
                  variant="standard"
                />
              </Grid>
              <Grid item className={classes.passwordInput}>
                <TextField
                  fullWidth={true}
                  id="outlined-uncontrolled"
                  label="Password"
                  value={Password}
                  type="password"
                  onChange={input("Password")}
                  margin="normal"
                  variant="standard"
                />
              </Grid>
            </Grid>
          </form>
          <Grid container direction={"row"} className={classes.loginButton}>
            <Grid item xs={12} className={classes.LoginButton}>
              <Button
                type={"submit"}
                color={"primary"}
                fullWidth
                variant={"contained"}
                onClick={siginIn}
              >
                Submit
              </Button>
            </Grid>
            <Grid item lg={3} />
          </Grid>
          {/* Grid container for the options FORGOT YOUR PASSWORD || REQUEST AN ACCOUNT */}
          <Grid
            container
            className={classes.buttonOptions}
            style={{ position: "relative", width: "100%" }}
            direction={"row"}
          >
            {/* Grid for the FORGOT YOUR PASSWORD button*/}
            <Grid item xs={5} lg={5} xl={5} className={classes.ButtonsWidth}>
              <a href="http://glaziers.com/">
                <Button
                  variant="outlined"
                  className={classes.buttonOptions}
                  color="primary"
                >
                  Forgot your password?
                </Button>
              </a>
            </Grid>

            {/* Grid for the REQUEST AN ACCOUNT button*/}
            <Grid
              item
              xs={5}
              className={classes.ButtonsWidth}
              style={{
                position: "absolute",
                right: "0px",
                bottom: "0px",
                width: "100%"
              }}
            >
              <Button
                className={classes.buttonOptions}
                variant="outlined"
                color="primary"
                onClick={this.onOpenModal}
              >
                Create an Account
              </Button>
            </Grid>
          </Grid>

          {/** 
                    * !This modal appears when clicking on the request an account button
                        --parent is in the reqFormModal.jsx 
            **/}
          <Grid item>
            <Modal open={open} onClose={this.onCloseModal}>
              <ReqFormModal
                loginMessage={this.onMessageReceived}
                style={{ zIndex: 1200 }}
              />
            </Modal>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
