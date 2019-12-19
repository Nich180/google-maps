import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function LoadingIcon(props) {
  const { classes } = props;
  return (
    <div style={{textAlign: "center", width: "100%"}}>
      <CircularProgress className={classes.progress} />
    </div>
  );
}

LoadingIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadingIcon);