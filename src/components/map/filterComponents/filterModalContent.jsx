import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import FilterSelect from './filterSelect';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

//api's
import RequestConTypes from '../../../services/Requests/Version2/contactTypes';
import RequestOwners from '../../../services/Requests/Version2/OwnersAPICalls';

import brisbaneStreets from "./filterStreetNames";

const cities = [
  { label: 'All' },
  { label: 'Sydney' },
  { label: 'Melbourne' },
  { label: 'Brisbane' },
  { label: 'Perth' },
  { label: 'Adelaide' },
  { label: 'Canberra' },
  { label: 'Hobart' }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));


const styles = (theme) => ({
	root: {
		flexGrow: 1
	},
	headerStyle: {
		padding: `35px 0px 35px 0px `,
		borderBottom: `13px solid #747db1`,
		background: `#3f51b5`
	},

	SuccessfulHeaderStyle: {
		padding: `35px 0px 35px 0px `,
		borderBottom: `13px solid #85ac91`,
		background: `#469a5f`
	},
	textWhite: {
		color: `white`
	},
	PaperRoot: {
		boxShadow: `none`,
		...theme.mixins.gutters(),
		padding: `0px 0% 30px 0%`,
		width: `95%`,
		margin: `auto`,
		marginTop: `3%`
	},
	buttonsPadding: {
		paddingTop: `10px`,
		paddingBottom: `28px`
	},
	FormContainer: {
		padding: `9px 0% 34px 0%`
	},
	tickIcon: {
		fontSize: `30px`,
		marginRight: `15px`
	}
});

function ContactNewForm(props) {
	const {
		classes,
    checkedA,
    OwnerLabels,
		ContactTypeLabels,
		FirstName,
		handleSubmit,
		handleCLoseRequestForm,
		handleChange
	} = props;
	return (
		<div className={classes.root}>
			<Grid container direction="row" justify="space-between" alignItems="center">
				<Grid item xs={12} className={classes.headerStyle}>
					<Typography align="center" variant="h4" className={classes.textWhite}>
						Filter Contacts
					</Typography>
				</Grid>
				<form style={{ width: `100%` }}>
					<Paper className={classes.PaperRoot}>
						<Grid container direction="row" justify="space-between" alignItems="center">
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											checked={props.checkedA}
											onChange={handleChange('checkedA')}
											value="checkedA"
										/>
									}
									label="Buildings without contacts"
								/>
							</Grid>
							<Grid item xs={5}>
								<TextField
									fullWidth={true}
									disabled={checkedA}
									id="date"
									label="Start date"
									type="date"
									defaultValue="1999-05-24"
									onChange={handleChange('StartDate')}
									className={classes.textField}
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
							<Grid item xs={5}>
								<TextField
									fullWidth={true}
									id="date"
									label="End date"
									type="date"
									disabled={checkedA}
									defaultValue="2017-05-24"
									onChange={handleChange('EndDate')}
									className={classes.textField}
									InputLabelProps={{
										shrink: true
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<FilterSelect placeholder={`Cities`} labels={cities} />
							</Grid>
							<Grid item xs={12}>
								<FilterSelect placeholder={`Select owner.`} labels={OwnerLabels} />
							</Grid>
							<Grid item xs={12}>
								<FilterSelect placeholder={`Select contact type.`} labels={ContactTypeLabels} />
							</Grid>
						</Grid>
					</Paper>
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
					<Button variant={'contained'} fullWidth={true} onClick={handleCLoseRequestForm}>
						Close
					</Button>
				</Grid>
				<Grid item xs={3}>
					<Button variant={'contained'} color={'secondary'} fullWidth={true} onClick={handleSubmit}>
						Submit
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}

class FilterModalContent extends React.Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	state = {
		FormSubmitted: false,
		StartDate: '',
		EndDate: '',
		Street: '',
		Owner: '',
		contactType: '',
		checkedA: false,
		ContactTypeLabels: [ {} ],
		OwnerLabels: [ {} ]
	};

	handleChange = (name) => (event) => {
		console.log(event.target.value);
		this.setState({ [name]: event.target.checked });
	};

	handleSubmit = () => {
		this.setState({ FormSubmitted: true });
	};

	componentDidMount() {
		this.GetContactTypes();
    this.GetOwners();
    console.log(brisbaneStreets);
	}

	async GetContactTypes() {
		const ResponseConTypes = await RequestConTypes.GETcontactTypeAll();
		var contactTypesLabels = [
			{
				label: 'All',
				value: 'All'
			}
		];
		try {
			const contactTypes = ResponseConTypes.data.data;
			for (var type in contactTypes) {
				contactTypesLabels.push({
					label: contactTypes[type].name,
					value: contactTypes[type].name
				});
			}
		} catch (error) {
			console.log(`Contact types GET error: `);
		}
		this.setState({ ContactTypeLabels: contactTypesLabels });
	}

	async GetOwners() {
		const ResponseOwners = await RequestOwners.GETowners();
		var OwnerLabels = [
			{
				label: 'All',
				value: 'All'
			}
		];
		try {
			const Owners = ResponseOwners.data.data;
			for (var owner in Owners) {
				OwnerLabels.push({
					label: Owners[owner].name,
					value: Owners[owner].name
				});
			}
		} catch (error) {
			console.log(`Contact types GET error: `);
		}
		this.setState({ OwnerLabels });
	}

	render() {
		const { FormSubmitted, FirstName, checkedA, ContactTypeLabels, LastName, Email, OwnerLabels } = this.state;
		const { classes, closeModal, closeFilter } = this.props;
		return (
			<React.Fragment>
				{FormSubmitted === false ? (
					<ContactNewForm
						classes={classes}
						FirstName={FirstName}
						LastName={LastName}
						checkedA={checkedA}
            Email={Email}
            OwnerLabels={OwnerLabels}
						ContactTypeLabels={ContactTypeLabels}
						handleContactDefault={this.handleContactDefault}
						handleChange={this.handleChange}
						handleSubmit={this.handleSubmit}
						handleCLoseRequestForm={closeFilter}
					/>
				) : (
					<div className={classes.root}>
						<Grid container direction="column" justify="center" alignItems="stretch">
							<Grid item xs={12} className={classes.SuccessfulHeaderStyle}>
								<Typography align="center" variant="h4" className={classes.textWhite}>
									<CheckCircleOutline className={classes.tickIcon} />
									Successfully submitted
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<Button variant={'contained'} fullWidth={true} onClick={closeFilter}>
									<ArrowBackIos />
									Close
								</Button>
							</Grid>
						</Grid>
					</div>
				)}
			</React.Fragment>
		);
	}
}

FilterModalContent.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterModalContent);
