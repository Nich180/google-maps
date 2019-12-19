import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, withTheme } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Label from "@material-ui/icons/Label";
import Divider from "@material-ui/core/Divider";
import FilterSettingsModal from "./filterSettingsModal";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

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
    padding: `15px`,
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

class FilterSidePanel extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    openModal: false,
    left: false,
    open: false,
    modalTitle: "",
    menuOptions: [{ label: "Contacts", value: 0 }]
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

    const ProfileSideList = (
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
        <Button onClick={this.toggleDrawer("left", true)}>
          <MenuIcon />
        </Button>

        {/* Menu Drawer on the left side */}
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
          onOpen={this.toggleDrawer("left", true)}
        >
          <div
            style={{ background: "#2196f3", height: "100%" }}
            tabIndex={0}
            role="button"
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {/* Menu title drawer */}
            <Typography align="left" className={classes.header} variant="h5">
              Filter Types
            </Typography>

            {sideList}
            {/* <Divider />
            <Typography align="left" className={classes.header} variant="h5">
              Account Profile
            </Typography>
            {ProfileSideList} */}
          </div>
        </SwipeableDrawer>

        {/* Filter settings Modal Window */}
        <Modal
          open={openModal}
          onClose={this.handleCloseModal}
          className={classes.FilterModal}
        >
          <FilterSettingsModal
            closeFilter={this.handleCloseModal}
            loginMessage={this.handleMessageReceived}
            title={modalTitle}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

FilterSidePanel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterSidePanel);
