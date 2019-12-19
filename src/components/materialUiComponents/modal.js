import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//Links

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import HistoryIndexPage from '../../components/map/mapComponents/transactionCompons/History';
import TransactionForm from '../../components/map/mapComponents/transactionCompons/Transaction';

const styles = (theme) => ({
	paper: {
		position: 'absolute',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		outline: 'none',
		width: '100%',
		height: '100%'
	},
	dialogRoot: { padding: `0px` },
	modal: {
		tabIndex: `-1`,
		maxHeight: 'fit-content',
		margin: 'auto',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '95%'
		},
		[theme.breakpoints.between('md', 'sm')]: {
			maxWidth: 'fit-content'
		},
		[theme.breakpoints.up('lg')]: {
			maxWidth: 'fit-content'
		}
	}
});

class SimpleModal extends React.Component {
	constructor(props) {
		super(props);

		this.handleTasksOpen = this.handleTasksOpen.bind(this);
		this.handleTasksClose = this.handleTasksClose.bind(this);
		this.handleHistoryOpen = this.handleHistoryOpen.bind(this);
		this.handleHistoryClose = this.handleHistoryClose.bind(this);
	}
	state = {
		TasksOpen: false,
		HistoryOpen: false
	};

	handleTasksOpen = () => {
		this.setState({ TasksOpen: true });
	};

	handleTasksClose = () => {
		this.setState({ TasksOpen: false });
	};

	handleHistoryOpen = () => {
		this.setState({ HistoryOpen: true });
	};

	handleHistoryClose = () => {
		this.setState({ HistoryOpen: false });
	};

	render() {
		const { TasksOpen, HistoryOpen } = this.state;
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Grid container justify={'space-evenly'} alignItems={'center'} direction={'row'}>
					<Grid item xs={5}>
						<Button onClick={this.handleTasksOpen} color={'primary'} fullWidth={true} variant={'outlined'}>
							Tasks
						</Button>
					</Grid>

					<Grid item xs={5}>
						<Button
							onClick={this.handleHistoryOpen}
							color={'primary'}
							fullWidth={true}
							variant={'outlined'}
						>
							History
						</Button>
					</Grid>
				</Grid>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={TasksOpen}
					onClose={this.handleTasksClose}
					className={classes.modal}
					id="Modal-BIG-id"
				>
					<DialogContent className={classes.dialogRoot}>
						<TransactionForm exitModal={this.handleTasksClose} />
					</DialogContent>
				</Modal>
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={HistoryOpen}
					onClose={this.handleHistoryClose}
					className={classes.modal}
					id="Modal-BIG-id"
				>
					<DialogContent className={classes.dialogRoot}>
						<HistoryIndexPage exitModal={this.handleHistoryClose} />
					</DialogContent>
				</Modal>
			</React.Fragment>
		);
	}
}

SimpleModal.propTypes = {
	classes: PropTypes.object.isRequired
};
export default withStyles(styles)(SimpleModal);
