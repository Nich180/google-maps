import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import OwnerAutoComplete from './ownerAutoComplete';
import OwnerRequests from '../../../../../../services/Requests/Version2/OwnersAPICalls';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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
	PaperRoot: {
		...theme.mixins.gutters(),
		padding: `30px 15px 30px 15px`,
		width: `95%`,
		margin: `auto`,
		marginTop: `3%`
	},
	buttonsPadding: {
		paddingBottom: `30px`
	},
	FormContainer: {
		padding: `9px 0% 34px 0%`
	},
	widths: {
		maxHeight: 'fit-content',
		margin: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '-webkit-fill-available'
		},
		[theme.breakpoints.up('md')]: {
			width: '-webkit-fill-available'
		},
		[theme.breakpoints.up('lg')]: {
			minWidth: '900px'
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular
		}
	}
});
class AssignOwnerForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			singleOwnerResult: '',
			submitDisabled: false,
			selectDisabled: false,
			ownerOptions: [ { label: 'Search contacts', value: 'SearchContacts' } ]
		};
		this.handleSearchChange = this.handleSearchChange.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	handleSearchChange = async (value) => {
		this.setState({ singleOwnerResult: value });
	};

	handleInputChange = async (value) => {
		console.log(value);
	};

	render() {
		const { handleSubmit, handleContactTasksMenu, classes, owners } = this.props;
    const { ownerOptions, singleOwnerResult } = this.state;
    
    console.log(owners);
		return (
			<div className={classes.root}>
				<Grid container direction="column" justify="center" alignItems="stretch">
					<Grid item xs={12} className={classes.headerStyle}>
						<Typography align="center" variant="h4" className={classes.textWhite}>
							Assign Owner Form
						</Typography>
					</Grid>
					<form className={classes.widths}>
						<Grid container className={classes.FormContainer}>
							<Paper className={classes.PaperRoot}>
								<Grid item xs={12}>
									<OwnerAutoComplete
										choices={owners}
										onSelectChange={this.handleSearchChange}
										InputChange={this.handleInputChange}
										onSingle={singleOwnerResult}
									/>
								</Grid>
								<br />
								<Grid item xs={12}>
									<ExpansionPanel>
										<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
											<Typography className={classes.heading}>Tooltip</Typography>
										</ExpansionPanelSummary>
										<ExpansionPanelDetails>
											<Typography variant={'body1'}>
												The select tool (above) will allow you to choose from a list of owners
												that can be assigned to this building once you've submitted. If the
												owner you're looking for isn't listed, create a new one from the owners
												menu options.
											</Typography>
										</ExpansionPanelDetails>
									</ExpansionPanel>
								</Grid>
							</Paper>
						</Grid>
					</form>
				</Grid>
				<Grid
					className={classes.buttonsPadding}
					container
					direction="row"
					justify="space-evenly"
					alignItems="center"
				>
					<Grid item xs={3}>
						<Button variant={'contained'} fullWidth={true} onClick={handleContactTasksMenu}>
							Back to tasks
						</Button>
					</Grid>
					<Grid item xs={3}>
						<Button
							disabled={this.state.submitDisabled}
							variant={'contained'}
							color={'secondary'}
							fullWidth={true}
							onClick={() => handleSubmit(singleOwnerResult)}
						>
							Submit
						</Button>
					</Grid>
				</Grid>
			</div>
		);
	}
}

AssignOwnerForm.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AssignOwnerForm);
