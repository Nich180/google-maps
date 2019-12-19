import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// MODAL CHOICES FOR CONTACT TASKS
import OwnerOptions from '../ownerComponents/containers/ownerMenuOptions';
import GetAllOwners from '../ownerComponents/containers/getAllContainer';
import AssignOwnerContainer from '../ownerComponents/containers/assignOwnerContainer';
import NewOwnerContainer from '../ownerComponents/containers/newOwnerContainer';
const styles = (theme) => ({
	root: {
		flexGrow: 1
	}
});

class OwnerTypes extends React.Component {
	constructor(props) {
		super(props);
		this.state = { open: true, windowState: 'OwnerTasks' };

		this.handleGoToUpdateMenu = this.handleGoToUpdateMenu.bind(this);
		this.handleOwnerDefault = this.handleOwnerDefault.bind(this);
		this.handleGoToGetAllMenu = this.handleGoToGetAllMenu.bind(this);
		this.handleGoToAssignMenu = this.handleGoToAssignMenu.bind(this);
	}

	handleOwnerDefault = () => {
		this.setState({ windowState: 'OwnerTasks' });
	};

	handleGoToGetAllMenu = () => {
		this.setState({ windowState: 'GetAll' });
	};

	handleGoToAssignMenu = () => {
		this.setState({ windowState: 'AssignOwner' });
	};

	handleGoToUpdateMenu = () => {
		this.setState({ windowState: 'CreateOwner' });
	};

	render() {
		const { windowState } = this.state;
		const { classes, BackToTasksWindow } = this.props;
		return (
			<React.Fragment>
				{/* in the file it renders all the options to select from within the Transaction - Contacts 
            Options include Create, Delete, and Get all.
        */}
				<Grid className={classes.root} container direction="column" justify="center">
					{/* Default state, main menu */}
					{windowState === 'OwnerTasks' ? (
						<OwnerOptions
							BackToTasksWindow={BackToTasksWindow}
							handleUpdateMenu={this.handleGoToUpdateMenu}
							handleAssignMenu={this.handleGoToAssignMenu}
							handleGetAllMenu={this.handleGoToGetAllMenu}
							classes={classes}
						/>
					) : // Window setting for the update menu
					windowState === 'CreateOwner' ? (
						<NewOwnerContainer BackToContactTasksMenu={this.handleOwnerDefault} />
					) : // Window setting for the update menu
					windowState === 'AssignOwner' ? (
						<AssignOwnerContainer BackToContactTasksMenu={this.handleOwnerDefault} /> // Window setting for the update menu
					) : windowState === 'GetAll' ? (
						<GetAllOwners BackToContactTasksMenu={this.handleOwnerDefault} />
					) : (
						//Return FALSE
						<div> Null </div>
					)}
				</Grid>
			</React.Fragment>
		);
	}
}

OwnerTypes.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OwnerTypes);
