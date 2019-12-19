import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import IntegrationReactSelect from '../contactForms/formComponents/GetAutocOmplete';
import ContactRequests from '../../../../../../services/Requests/Version2/BuildingContactTaskAPICalls';

const contactTypes = [
	{
		value: 'Building manager',
		label: 'Building manager'
	},
	{
		value: 'Project manager',
		label: 'Project manager'
	},
	{
		value: 'Reception',
		label: 'Reception'
	},
	{
		value: 'Building contact',
		label: 'Building contact'
	}
];

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
		...theme.mixins.gutters(),
		padding: `0px 0% 30px 0%`,
		width: `95%`,
		margin: `auto`,
		marginTop: `3%`,
		paddingTop: `30px`
	},
	buttonsPadding: {
		paddingBottom: `30px`
	},
	FormContainer: {
		padding: `9px 0% 34px 0%`
	},
	tickIcon: {
		fontSize: `30px`,
		marginRight: `15px`
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
		}
	}
});
class DeleteContact extends React.Component {
	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
	}

	state = {
		single: null,
		multi: null,
		data: [ {} ]
	};

	handleChange = () => {
		console.log(this.state);
	};

	async componentDidMount() {
		const response = await ContactRequests.GETallBuildingContacts();
		let responsePlaceholder = [ ...response ];
    let unFilteredList = [{ }]
		if (responsePlaceholder.length === 0)
			return (
				(unFilteredList = {
					label: 'No contacts found',
					value: 'No contacts found'
				}),
				this.setState({ data: unFilteredList })
			);
		responsePlaceholder.forEach(function(element) {
			unFilteredList.push({
				label: `${element.first_name} ${element.last_name}`,
				value: `${element.first_name} ${element.last_name}`
			});
		});

		let cleanList = unFilteredList.filter((value) => Object.keys(value).length !== 0);
		console.log(cleanList);
		this.setState({ data: cleanList });
	}

	render() {
		const { DeleteContactFormData, handleSubmit, returnBack, classes } = this.props;

		const { single, multi, data } = this.state;

		return (
			<div className={classes.root}>
				<Grid container direction="column" justify="center" alignItems="stretch">
					<Grid item xs={12} className={classes.headerStyle}>
						<Typography align="center" variant="h4" className={classes.textWhite}>
							Contact Delete Form
						</Typography>
					</Grid>
					<form className={classes.widths}>
						<Grid container className={classes.FormContainer}>
							<Paper className={classes.PaperRoot}>
								<Grid item xs={12}>
									<IntegrationReactSelect
										single={single}
										multi={multi}
										inputChange={this.handleChange}
										contacts={data}
									/>
								</Grid>

								<Grid item xs={12}>
									<TextField
										fullWidth={true}
										id="standard-select-contactType"
										select
										label="Select"
										value={DeleteContactFormData.ContactTypes}
										onChange={() => this.handleChange('ContactTypes')}
										fullWidth={true}
										SelectProps={{
											MenuProps: {
												className: classes.menu
											}
										}}
										helperText="Please select contact type"
										margin="normal"
									>
										{contactTypes.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</TextField>
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
						<Button variant={'contained'} fullWidth={true} onClick={returnBack}>
							Back to tasks
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
}

DeleteContact.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DeleteContact);
