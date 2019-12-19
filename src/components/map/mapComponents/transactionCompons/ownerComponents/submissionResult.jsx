import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import ErrorIcon from "@material-ui/icons/ErrorOutline";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  headerStyle: {
    padding: `35px 0px 35px 0px `,
    borderBottom: `13px solid #747db1`,
    background: `#3f51b5`
  },
  FailedHeaderStyle: {
    padding: `35px 80px 35px 70px`,
    borderBottom: `13px solid #df7979`,
    background: `#ca1f1f`
  },
  SuccessfulHeaderStyle: {
    padding: `35px 70px 35px 70px `,
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
    },

    tickIcon: {
      width: `.75em`,
      height: `1.15em`,
      marginRight: `10px`
    }
  }
});

class SubmissionResult extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      returnBack,
      isSuccessful,
      formStatus,
      formMessage
    } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid
            className={classes.widths}
            container
            direction="column"
            justify="center"
            alignItems="stretch"
          >
            {isSuccessful ? (
              <React.Fragment>
                <Grid item xs={12} className={classes.SuccessfulHeaderStyle}>
                  <Typography
                    align="center"
                    variant="h4"
                    className={classes.textWhite}
                  >
                    <div
                      style={{
                        marginRight: `25px`,
                        display: `-webkit-inline-box`
                      }}
                    >
                      <CheckCircleOutline className={classes.tickIcon} />
                    </div>
                    {formStatus}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      textAlign: `-webkit-center`,
                      padding: `50px 35px 50px 35px`
                    }}
                  >
                    {formMessage}
                  </div>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid item xs={12} className={classes.FailedHeaderStyle}>
                  <Typography
                    align="center"
                    variant="h4"
                    className={classes.textWhite}
                  >
                    <div
                      style={{
                        marginRight: `15px`,
                        display: `-webkit-inline-box`
                      }}
                    >
                      <ErrorIcon className={classes.tickIcon} />
                    </div>
                    Failed
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      textAlign: `-webkit-center`,
                      padding: `50px 35px 50px 35px`
                    }}
                  >
                    {formMessage}
                  </div>
                </Grid>
              </React.Fragment>
            )}

            <Grid item xs={12}>
              <Button
                variant={"contained"}
                fullWidth={true}
                onClick={returnBack}
              >
                <ArrowBackIos style={{ verticalAlign: `initial` }} />
                Back to tasks
              </Button>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

SubmissionResult.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SubmissionResult);
