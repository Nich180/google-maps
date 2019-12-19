import React, { Component } from "react";
import PropTypes from "prop-types";
import { InfoWindow } from "react-google-maps";
import InfoWindowButton from "./infoWindowButton";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  fontSizesHeader: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "20px"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "25px"
    }
  },
  fontSizesSubHeader: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px"
    },
    [theme.breakpoints.between("sm", "md")]: {
      fontSize: "16px"
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "18px"
    }
  }
});

class ReactInfoWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      position,
      status,
      name,
      address,
      closeInfoWindow,
      classes
    } = this.props;

    return (
      <React.Fragment>
        {status === true ? (
          <InfoWindow
            onCloseClick={event => {
              event.preventDefault();
            }}
            defaultPosition={position}
          >
            <div>
              <Grid container direction="column">
                <Grid item xs={12}>
                  <Typography className={classes.fontSizesHeader} variant={"h4"}>
                    {name}
                  </Typography>
                </Grid>
                <Divider />
                <Grid item xs={12}>
                  <Typography className={classes.fontSizesSubHeader} variant={"h5"}>{address}</Typography>
                </Grid>
              </Grid>
              <br />
              <Grid
                container
                direction="row"
                justify={`space-between`}
                alignItems={`center`}
              >
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    onClick={() => {
                      closeInfoWindow();
                    }}
                    variant={`contained`}
                    color={`default`}
                  >
                    Close
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <InfoWindowButton name={name} address={address} />
                </Grid>
              </Grid>
            </div>
          </InfoWindow>
        ) : null}
      </React.Fragment>
    );
  }
}

ReactInfoWindow.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ReactInfoWindow);
