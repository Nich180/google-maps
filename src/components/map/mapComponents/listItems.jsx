import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SimpleModal from '../../materialUiComponents/modal';

import Grid from '@material-ui/core/Grid';
import Transaction from '@material-ui/icons/Dvr';
import History from '@material-ui/icons/History';
import GpsFixed from '@material-ui/icons/GpsFixed';
import Assignment from '@material-ui/icons/Assignment';

const styles = (theme) => ({
	root: {
		flexGrow: 1
	}
});

class FolderList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes } = this.props;

		return (
			<Grid container direction="row" justify="center">
			
			</Grid>
		);
	}
}

FolderList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FolderList);
