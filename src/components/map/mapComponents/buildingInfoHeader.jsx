import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid"; 
import SimpleModal from "../../materialUiComponents/modal"
import Directions from "@material-ui/icons/Directions";
import Typography from "@material-ui/core/Typography";
import grey from "@material-ui/core/colors/grey";
import Fab from "@material-ui/core/Fab";
const materialWhite = grey[50];

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 4,
    textAlign: "left",
    color: theme.palette.text.secondary
  },
  bluePaper: {
    background: "#2196f3",
    boxShadow: "none"
  },
  blueContainer: {
    background: "#2196f3"
  },
  paperCenter: {
    textAlign: "center"
  },
  font: {
    color: materialWhite
  },
  customSpacing: {
    marginBottom: "5px"
  }
});

class BuildingInfoHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildingImage: "null"
    };
  }

  componentDidMount() {
    const Image =
      "https://lh6.googleusercontent.com/proxy/YgTEVaol4y0_idFm3DyqKfS35gHYTlYb--5x6201aWI3yirzPmvDp99GS6p6A-5UO8Ap6zp-sBuvFD-0lRPYDbAuvvBVoyOrozmirW4LTsuVoxVsSTr_AMV3CtaJIpUvnS4hXS5c95gIcvAYCBhDlPFL5TOPbQ8=w408-h305-k-no";
    this.setState({ buildingImage: Image });
  }

  render() {
    const { buildingImage } = this.state;
    const { classes,  name, address, CloseDrawer } = this.props;

    return (
      // The info header contains the building image, title/owner, and buttons
      <React.Fragment>
        {/* <Grid item xs={12}>
          <Paper
            className={classes.paper}
            style={{
              backgroundImage: `url("${buildingImage}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "300px",
              backgroundPosition: "center"
            }}
          />
        </Grid> */}
        <Grid container className={classes.blueContainer}>
          <Grid item xs={9}>
            <Paper className={`${classes.paper} ${classes.bluePaper}`}>
            <button onClick={CloseDrawer("left", false)} id="close-red-button">close</button>
              <Typography
                className={`${classes.font} ${classes.customSpacing}`}
                variant="h4"
              >
                {name}
              </Typography>
              <Typography className={classes.font} variant="h5">
                {address}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={3} style={{ textAlign: "center", margin: "auto" }}>
            {/* <Fab
              size="large"
              color="primary"
              aria-label="Add"
              className={classes.fab}
            >
              <Directions fontSize="large" />
            </Fab> */}
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ width: "0px" }}>
          <Paper className={classes.paper}>
            <Grid item xs={12} md={12}>
              <div className={classes.demo}>
                <SimpleModal />
              </div>
            </Grid>
          </Paper>
        </Grid>
      </React.Fragment>
    );
  }
}

BuildingInfoHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BuildingInfoHeader);
