import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


import axios from "axios";
import LoadingIcon from '../../animations/loadingIcon';
import BuildingInfoList from './buildingInfoList';
import BuildingRequest from '../../../services/Requests/Version2/BuildingAPICalls';
const styles = (theme) => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
});

class BuildingInfoDrawers extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		dataLoaded: 'loading',
		information: [ {} ]
	};

	signal = axios.CancelToken.source();

	async componentDidMount() {
		const buildingInfoResponse = await BuildingRequest.GETbuildingInfo(this.signal.token);
		if (buildingInfoResponse !== null) {
			this.setState({
				information: buildingInfoResponse,
				dataLoaded: 'success'
			});
		} else {
			this.setState({
				dataLoaded: 'failed'
			});
		}
	}

	componentWillUnmount(){
		console.log(`unmounted`)
		this.signal.cancel(`Cancelling api call`)
	}

	render() {
		const { classes } = this.props;
		const { information, dataLoaded } = this.state;

		return (
			<React.Fragment>
				{dataLoaded === 'loading' ? (
					<React.Fragment>
						<LoadingIcon />
					</React.Fragment>
				) : dataLoaded === 'success' ? (
					<React.Fragment>
						<BuildingInfoList information={information} />
					</React.Fragment>
				) : (
					<React.Fragment>failed</React.Fragment>
				)}
				{/* Primary information */}
			</React.Fragment>
		);
	}
}
BuildingInfoDrawers.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BuildingInfoDrawers);
