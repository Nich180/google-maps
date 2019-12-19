import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import LoadingIcon from '../../../../../animations/loadingIcon';
import Request from '../../../../../../services/Requests/Version2/HistoryAPICalls';

const rows = [
	{ id: 'operation', numeric: false, disablePadding: true, label: 'Operation' },
	{
		id: 'completedBy',
		numeric: true,
		disablePadding: false,
		label: 'Completed by'
	},
	{
		id: 'completedOn',
		numeric: true,
		disablePadding: false,
		label: 'Completed on'
	}
];

class EnhancedTableHead extends React.Component {
	createSortHandler = (property) => (event) => {
		this.props.onRequestSort(event, property);
	};

	render() {
		const { order, orderBy } = this.props;

		return (
			<TableHead>
				<TableRow>
					{rows.map(
						(row) => (
							<TableCell
								key={row.id}
								align={row.numeric ? 'right' : 'left'}
								padding={row.disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === row.id ? order : false}
							>
								<Tooltip
									title="Sort"
									placement={row.numeric ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === row.id}
										direction={order}
										onClick={this.createSortHandler(row.id)}
									>
										{row.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						),
						this
					)}
				</TableRow>
			</TableHead>
		);
	}
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

const styles = (theme) => ({
	root: {
		width: '100%',
    overflow: `auto`,
		marginTop: theme.spacing.unit * 1,
		padding: `0px 20px 0px 20px`
	},
	table: {

	},
	tableWrapper: {
		overflowX: 'auto'
	},
	paddingNone: { position: `relative`, left: `-24px ` }
});

class HistoryEnhancedTable extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			order: 'asc',
			orderBy: 'calories',
      selected: [],
      historyLogs: {},
			loadedContacts: 'loading',
			page: 0,
			rowsPerPage: 5
		};
	}
	signal = axios.CancelToken.source();

	async componentDidMount() {
		this.setState({ loadedContacts: 'loading' });
		const response = await Request.GEThistoryRecords(0, 100, this.signal.token);
		this.setState({ historyLogs: response.data });
		if (this.state.historyLogs.data) {
			this.setState({ loadedContacts: 'loadedContacts' });
		} else {
			this.setState({ loadedContacts: 'emptylist' });
		}
	}

	handleRequestSort = (event, property) => {
		const orderBy = property;
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		this.setState({ order, orderBy });
	};

	handleSelectAllClick = (event) => {
		if (event.target.checked) {
			this.setState((state) => ({ selected: state.data.map((n) => n.id) }));
			return;
		}
		this.setState({ selected: [] });
	};

	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	render() {
		const { classes } = this.props;
		const { historyLogs, order, orderBy, selected, rowsPerPage, page, loadedContacts } = this.state;

    return (
			<Table className={classes.table} aria-labelledby="tableTitle">
				{loadedContacts === 'loadedContacts' ? (
					<React.Fragment>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={historyLogs.data.length}
						/>
						<TableBody>
							<React.Fragment>
								{historyLogs.data.map((n) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={n.completed_on}>
											<TableCell component="th" scope="row" padding="none">
												{n.operation}
											</TableCell>
											<TableCell align="right">{n.completed_by}</TableCell>
											<TableCell align="right">{n.completed_on}</TableCell>
										</TableRow>
									);
								})}
							</React.Fragment>
						</TableBody>
					</React.Fragment>
				) : loadedContacts === 'emptylist' ? (
					<TableBody>
						<TableRow hover role="checkbox" tabIndex={-1}>
							<TableCell component="th" scope="row" padding="none">
								<Typography varaint="h4" align="center">
									{historyLogs.message}
								</Typography>
							</TableCell>
						</TableRow>
					</TableBody>
				) : (
					<React.Fragment>
						<LoadingIcon IconSubText={" "}/>
					</React.Fragment>
				)}
				{historyLogs.data !== null ? (
					<TablePagination
						className={classes.paddingNone}
						rowsPerPageOptions={[ 5, 10, 25 ]}
						component="div"
						count={10}
						rowsPerPage={rowsPerPage}
						page={page}
						backIconButtonProps={{
							'aria-label': 'Previous Page'
						}}
						nextIconButtonProps={{
							'aria-label': 'Next Page'
						}}
						onChangePage={this.handleChangePage}
					/>
				) : (
					<React.Fragment />
				)}
			</Table>
		);
	}
}

HistoryEnhancedTable.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(HistoryEnhancedTable);
