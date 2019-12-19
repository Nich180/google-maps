import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AssignOwnerForm from '../forms/assignOwner';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SubmissionResult from '../submissionResult';
import Paper from '@material-ui/core/Paper';
import LoadingIcon from '../../../../../animations/loadingIcon';
import BuildingOwnerRequests from '../../../../../../services/Requests/Version2/buildingOwnerApiCalls';
import OwnerRequests from '../../../../../../services/Requests/Version2/OwnersAPICalls';
const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	headerStyle: {
		padding: `35px 0px 35px 0px `,
		borderBottom: `13px solid #747db1`,
		background: `#3f51b5`
	},
	textWhite: {
		color: `white`
	},
	widths: {
		maxHeight: 'fit-content',
		margin: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		},
		[theme.breakpoints.up('md')]: {
			width: '90%'
		},
		[theme.breakpoints.up('lg')]: {
			width: '900px'
		}
	}
});

class AssignOwnerContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isSuccessful: false,
			formStatus: '',
			formMessage: '',
			FormSubmitted: 'default',
			postOwnerName: '',
			singleOwnerResult: '',
			submitDisabled: false,
			selectDisabled: false,
			ownerOptions: [ { label: 'Search contacts', value: 'SearchContacts' } ]
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	async componentDidMount() {
		const owners = await OwnerRequests.GETowners();
    let ownerLabels = [{}];
    for (var owner in owners.data.data) {
      ownerLabels.push({
        label: owners.data.data[owner].name,
        value: owners.data.data[owner].owner_id
      });
    }
    ownerLabels.shift();
		this.setState({ ownerOptions: ownerLabels });
	}

	handleSearchChange = async (value) => {
		console.log(value);
		this.setState({ singleOwnerResult: value });
	};

	handleInputChange = async (value) => {
		this.setState({ postOwnerName: value });
	};

	handleSubmit = async (OwnerResult) => {
		console.log(OwnerResult);
		this.setState({ FormSubmitted: 'validating' });

		const response = await BuildingOwnerRequests.POSTaddOwner(OwnerResult.value);

		this.setState({
			formStatus: response.data.status,
			formMessage: response.data.message
		});

		if (response.data.status === 'Success')
			return this.setState({ FormSubmitted: 'completed', isSuccessful: true });
		return this.setState({ FormSubmitted: 'completed', isSuccessful: false });
	};

	handleBackToTasks = () => {
		this.setState({ FormSubmitted: `default` });
	};

	render() {
		const { NewContactFormData, FormSubmitted, ownerOptions, isSuccessful } = this.state;
		const { classes, BackToContactTasksMenu } = this.props;
		return (
			<React.Fragment>
				{/* this component will render the new contact form with a conditional render with if success change to Success */}
				{FormSubmitted === `default` ? (
					<AssignOwnerForm
						owners={ownerOptions}
						classes={classes}
						InputNames={this.state}
						handleSearchChange={this.handleSearchChange}
						handleInputChange={this.handleInputChange}
						handleSubmit={this.handleSubmit}
						handleContactTasksMenu={BackToContactTasksMenu}
					/>
				) : FormSubmitted === `validating` ? (
					<Grid container className={classes.widths}>
						<Paper className={classes.widths}>
							<Grid item xs={12} className={classes.headerStyle}>
								<Typography align="center" variant="h4" className={classes.textWhite}>
									Owner Assign Form
								</Typography>
							</Grid>
							<div style={{ paddingTop: `35px`, paddingBottom: `20px` }}>
								<LoadingIcon IconSubText={``} />
							</div>
						</Paper>
					</Grid>
				) : FormSubmitted === `completed` ? (
					// this is shown when submission is succesful
					<SubmissionResult
						formStatus={this.state.formStatus}
						formMessage={this.state.formMessage}
						isSuccessful={isSuccessful}
						returnBack={this.handleBackToTasks}
					/>
				) : (
					<div />
				)}
			</React.Fragment>
		);
	}
}

AssignOwnerContainer.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssignOwnerContainer);
