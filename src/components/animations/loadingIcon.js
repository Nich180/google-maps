import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    width: "100px!important",
    height: "100px!important",
    color: "#2196f3"
  }
});

function LoadingIcon(props) {
  const { classes, IconSubText } = props;
  return (
    <div
      style={{
        textAlign: "center",
        width: "100%",
        height: "100%"
      }}
    >
      <div
        style={{
          position: "relative",
          height: "100%",
          maxWidth: "250px",
          maxHeight: "55%",
          margin: "auto"
        }}
      >
        <div
          style={{
            width: "fit-content",
            bottom: 0,
            height: "fit-content!important",
            margin: "auto"
          }}
        >
          <CircularProgress className={classes.progress} />
          <h3 style={{ marginTop: "15px" }}>{IconSubText}</h3>
        </div>
      </div>
    </div>
  );
}

LoadingIcon.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoadingIcon);
