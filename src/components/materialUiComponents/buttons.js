import React from "react";
import PropTypes from "prop-types";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import "../../public/stylesheets/css/buttonColors.css";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function MatButtons(props) {
  const {
    classes,
    FullWidth,
    Color,
    variant,
    text,
    onClick
  } = props;
  return (
    <React.Fragment>
      <Button
        fullWidth={FullWidth}
        color={Color}
        onClick={onClick}
        variant={variant}
      >
        {text}
      </Button>
    </React.Fragment>
  );
}

MatButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MatButtons);
