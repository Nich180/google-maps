import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import contactRequests from '../../../../../../services/Requests/Version2/BuildingContactTaskAPICalls';

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
	}
});

class AllContactsList extends React.Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	state = {
		contactsList: [ {} ]
	};

	async componentDidMount() {
		const contacts = await contactRequests.GETallBuildingContacts();
		console.log(contacts);
		this.setState({ contactsList: contacts });
	}

	render() {
		const { classes } = this.props;
    const { contactsList } = this.state; 
		console.log(`Contact list: ${this.state.contactsList}`);

		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell>Contact name</TableCell>
							<TableCell align="right">Contact type</TableCell>
							<TableCell align="right">Mobile</TableCell>
							<TableCell align="right">Phone</TableCell>
							<TableCell align="right">Email</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{contactsList.map((row) => (
							<TableRow key={row.buidling_id}>
								<TableCell component="th" scope="row">
									{`${row.first_name} ${row.last_name}`}
								</TableCell>
								<TableCell align="right">{row.contact_type}</TableCell>
								<TableCell align="right">{row.mobile}</TableCell>
								<TableCell align="right">{row.phone}</TableCell>
								<TableCell align="right">{row.email}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

AllContactsList.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AllContactsList);
