import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SearchIcon from "@material-ui/icons/Search";
import Label from "@material-ui/icons/Label";

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  labelRoot: {
    color: "white"
  },
  header: {
    marginTop: "10%",
    marginBottom: "5%",
    color: "white"
  },
  FilterModal: {
    [theme.breakpoints.down("xs")]: {
      width: "-webkit-fill-available"
    },
    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available"
    },
    [theme.breakpoints.up("md")]: {
      margin: "auto"
    },

    [theme.breakpoints.up("xl")]: {
      maxWidth: "65%",
      width: "100%",
      margin: "auto"
    }
  }
});

class Searching extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    openModal: false,
    left: false,
    open: false,
    modalTitle: "",
    menuOptions: [{ label: "Buildings", value: 0 }]
  };

  componentDidMount() {
    this.setState({
      left: false,
      open: false
    });
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  handleOpenModal = title => {
    this.setState({ modalTitle: title, openModal: true });
  };

  handleCloseModal = () => {
    this.setState({ openModal: false });
  };

  handleMessageReceived = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { classes } = this.props;
    const { openModal, modalTitle, menuOptions } = this.state;

    const sideList = (
      <div id="modal-container-drawer" className={classes.list}>
        <List className={classes.listContainer}>
          {menuOptions.map(option => (
            <ListItem
              button
              key={option.value}
              onClick={() => this.handleOpenModal(option.label)}
            >
              <ListItemIcon>
                <Label className={classes.labelRoot} />
              </ListItemIcon>
              <ListItemText primary={option.label} className="listItemText" />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      // Parent component is FilterSettings JSX
      <React.Fragment>
        {/* Menu icon to open left drawer */}
        <Button onClick={() => {console.log(`Searched!`)}}>
          <SearchIcon />
        </Button>
      </React.Fragment>
    );
  }
}

Searching.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Searching);
