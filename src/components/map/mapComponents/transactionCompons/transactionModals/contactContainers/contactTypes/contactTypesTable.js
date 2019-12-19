import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import UpdateCreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import Modal from "@material-ui/core/Modal";
import contactTypesRequests from "../../../../../../../services/Requests/Version2/contactTypes";
import LoadingIcon from "../../../../../animations/loadingIcon";
// import UpdateContact from "../contactContainers/updateContactContainer";
// import DeleteContactTable from "../contactContainers/deleteContactTable";

const rows = [{ id: 0, numeric: false, label: "Create" }];

class EnhancedTableHead extends React.Component {
  render() {
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
          {rows.map(row => (
            <TableCell
              key={row.id}
              align={row.numeric ? "center" : "center"}
              // padding={row.disablePadding ? "none" : "default"}
            />
          ))}
        </TableRow>
      </TableHead>
    );
  }
}

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
            Contacts Types
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
    this.handleModal = this.handleModal.bind(this);
    this.handleUpdateList = this.handleUpdateList.bind(this);
  }
  state = {
    data: [{}],
    selectedForUpdate: [{}],
    UpdateOpen: false,
    DeleteOpen: false,
    loadedContacts: "loading",
    owner: ""
  };

  async componentDidMount() {
    const { data } = this.state;
    this.setState({ loadedContacts: "loading" });
    const contacts = await contactTypesRequests.GETcontactTypeAll();

    if ( data.length === )
      return this.setState({ loadedContacts: "emptylist" });
    this.setState({ loadedContacts: "loadedContacts" });
  }

  handleModal = (modalName, event) => {
  };


  handleUpdateList = async () => {
    const contacts = await contactRequests.GETallBuildingContacts();
    this.setState({ data: contacts });
  };

  render() {
    const { classes } = this.props;
    const { data, selected, loadedContacts } = this.state;

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          {loadedContacts === "loadedContacts" ? (
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead />
              <TableBody>
                {data.length < 0 ? (
                  <React.Fragment />
                ) : (
                  <React.Fragment>
                    {/* {data.map(n => {
                      return (
                        <TableRow hover tabIndex={-1} key={n.contact_id}>
                          <TableCell padding="checkbox">
                            <IconButton
                              aria-label="Update"
                              className={classes.margin}
                              onClick={() => this.handleUpdateOpen(n)}
                            >
                              <UpdateCreateIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell padding="checkbox">
                            <IconButton
                              aria-label="Delete"
                              className={classes.margin}
                              onClick={() =>
                                this.handleDeleteOpen(n.contact_id)
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
                            {`contact type`}
                          </TableCell>
                        </TableRow>
                      );
                    })} */}
                  </React.Fragment>
                )}
              </TableBody>
            </Table>
          ) : loadedContacts === "emptylist" ? (
            <div style={{ textAlign: `center`, padding: `25px 0px 50px 0px` }}>
              <Typography varaint="h4" align="center">
                No contacts were found in this building.
              </Typography>
            </div>
          ) : (
            <div style={{ textAlign: `center` }}>
              <LoadingIcon />
            </div>
          )}

          {/* <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.UpdateOpen}
            className={classes.heightBalance}
            onClose={this.handleUpdateClose}
          >
            <UpdateContact
              contactData={this.state.selectedForUpdate}
              onUpdate={this.handleUpdateList}
              CloseModal={this.handleUpdateClose}
            />
          </Modal> */}

          {/* DELETE CONTACT MODAL */}
          {/* <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.DeleteOpen}
            onClose={this.handleDeleteClose}
            className={classes.heightBalance}
          >
            <DeleteContactTable
              onUpdate={this.handleUpdateList}
              CloseModal={this.handleDeleteClose}
            />
          </Modal> */}
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
