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

class DeleteSuccess extends React.Component {

  render() {
    const { classes, isSuccessful, CloseModal } = this.props;
    return (
      <React.Fragment>
        <div className={classes.root}>
          <Grid
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
                    <div style={{ marginRight: `15px`, display: `-webkit-inline-box` }}>
                      <CheckCircleOutline className={classes.tickIcon} />
                    </div>
                    Successful
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <div
                    style={{
                      textAlign: `-webkit-center`,
                      padding: `50px 35px 50px 35px`
                    }}
                  >
                    Successfully created new contact associated with this
                    building.
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
                    Failed to delete entity. 
                  </div>
                </Grid>
              </React.Fragment>
            )}

            <Grid item xs={12}>
              <Button
                variant={"contained"}
                fullWidth={true}
                onClick={CloseModal}
              >
                <ArrowBackIos style={{ verticalAlign: `initial` }} />
                Close
              </Button>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

DeleteSuccess.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteSuccess);
