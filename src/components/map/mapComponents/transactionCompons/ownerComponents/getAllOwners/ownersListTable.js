import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import UpdateCreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Modal from "@material-ui/core/Modal";
import OwnerRequests from "../../../../../../services/Requests/Version2/buildingOwnerApiCalls";
import LoadingIcon from "../../../../../animations/loadingIcon";
// import UpdateContact from "../contactContainers/updateContactContainer";
import DeleteOwnerTable from "../forms/deleteOwnerTable";
import DialogContent from "@material-ui/core/DialogContent";

let counter = 0;
function createData(name, calories, fat, carbs, protein) {
  counter += 1;
  return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: 0,
    numeric: false,
    disablePadding: true,
    label: "Contact name"
  }
  // {
  //   id: 1,
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Contact type"
  // },
  // { id: 2, numeric: false, disablePadding: false, label: "Mobile" },
  // { id: 3, numeric: false, disablePadding: false, label: "Phone" },
  // { id: 4, numeric: false, disablePadding: false, label: "Email" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell
            style={{ width: `1px`, padding: `0`, textAlign: `-webkit-center` }}
          >
            Update
          </TableCell>
          <TableCell
            style={{ width: `1px`, padding: `0`, textAlign: `-webkit-center` }}
          >
            Delete
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? "center" : "center"}
                padding={row.disablePadding ? "none" : "default"}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? "bottom-end" : "bottom-start"}
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

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            Owners
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  },
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: "none"
  },
  heightBalance: { maxHeight: `fit-content`, margin: `auto`, tabIndex: `-1` }
});

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleNavChange = this.handleNavChange.bind(this);
    this.handleUpdateList = this.handleUpdateList.bind(this);
  }
  state = {
    order: "asc",
    orderBy: "calories",
    selected: [],
    ownerData: [createData(null, null, null, "null", "null")],
    page: 0,
    rowsPerPage: 5,
    selectedForUpdate: [{}],
    UpdateOpen: false,
    DeleteOpen: false,
    loadedContacts: "loading",
    owner: "",
    options: [{}]
  };

  async componentDidMount() {
    this.setState({ loadedContacts: "loading" });
    const owners = await OwnerRequests.GETallOwners();
    if (owners.data.data !== null) {
      this.setState({ ownerData: owners.data.data });
    } else {
      return this.setState({ loadedContacts: "emptylist" });
    }
    this.setState({ loadedContacts: "loadedContacts" });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.ownerData.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleUpdate = async event => {
    // response = BuildingContactRequest
  };

  handleUpdateOpen = e => {
    localStorage.setItem("contactId", e.contact_id);
    this.setState({ UpdateOpen: true, selectedForUpdate: e });
  };

  handleUpdateClose = () => {
    this.setState({ UpdateOpen: false });
  };

  handleDeleteOpen = e => {
    localStorage.setItem("contactId", e);
    this.setState({ DeleteOpen: true });
  };

  handleDeleteClose = () => {
    this.setState({ DeleteOpen: false });
  };

  handleNavChange = async (name, event) => {
    // this.setState({ [name]: event.target.value });
    // const response = await contactRequests.GETallBuildingContactsLabels();
    // this.setState({ options: response });
    // this.setState({ loadedContacts: true });
  };

  handleUpdateList = async () => {
    console.log("updating");
    this.setState({ loadedContacts: "loading" });
    const owners = await OwnerRequests.GETallOwners();
    let nullData = [createData(null, null, null, "null", "null")];

    if (owners.data.data === null) {
      return this.setState({ ownerData: nullData });
    } else {
      this.setState({ ownerData: owners.data.data });
    }
    console.log(owners)
    return this.setState({ loadedContacts: "loadedContacts" });
  };

  render() {
    const { classes } = this.props;
    const {
      ownerData,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      loadedContacts
    } = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          {loadedContacts === "loadedContacts" ? (
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={ownerData.length}
              />
              <TableBody>
                {ownerData.length < 0 ? (
                  <React.Fragment>
                    No owners were found in this building
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {stableSort(ownerData, getSorting(order, orderBy))
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(owner => {
                        const isSelected = this.isSelected(owner.owner_id);
                        return (
                          <TableRow hover tabIndex={-1} key={owner.owner_id}>
                            <TableCell padding="checkbox">
                              <IconButton
                                aria-label="Update"
                                className={classes.margin}
                                onClick={() => this.handleUpdateOpen(owner)}
                              >
                                <UpdateCreateIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell padding="checkbox">
                              <IconButton
                                aria-label="Delete"
                                className={classes.margin}
                                onClick={() =>
                                  this.handleDeleteOpen(owner.owner_id)
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell
                              align="center"
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              {`${owner.name}`}
                            </TableCell>
                            {/* <TableCell align="center">
                              {n.contact_type}
                            </TableCell>
                            <TableCell align="center">{n.mobile}</TableCell>
                            <TableCell align="center">{n.phone}</TableCell>
                            <TableCell align="center">{n.email}</TableCell> */}
                          </TableRow>
                        );
                      })}
                  </React.Fragment>
                )}
              </TableBody>
            </Table>
          ) : loadedContacts === "emptylist" ? (
            <div style={{ textAlign: `center`, padding: `25px 0px 50px 0px` }}>
              <Typography varaint="h4" align="center">
                No owners were found in this building.
              </Typography>
            </div>
          ) : (
            <div style={{ textAlign: `center` }}>
              <LoadingIcon />
            </div>
          )}

          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.UpdateOpen}
            className={classes.heightBalance}
            onClose={this.handleUpdateClose}
          >
            {/* <UpdateContact
              contactData={this.state.selectedForUpdate}
              onUpdate={this.handleUpdateList}
              CloseModal={this.handleUpdateClose}
            /> */}
          </Modal>

          {/* DELETE CONTACT MODAL */}
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.DeleteOpen}
            onClose={this.handleDeleteClose}
            className={classes.heightBalance}
          >
            <DialogContent>
              <DeleteOwnerTable
                onUpdate={this.handleUpdateList}
                CloseModal={this.handleDeleteClose}
              />
            </DialogContent>
          </Modal>
        </div>
        {/* <IntegrationReactSelect
          value={this.state.owner}
          inputChange={event => this.handleNavChange("owner", event)}
          entries={this.state.options}
        /> */}
      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
