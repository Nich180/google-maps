import React, { Component } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";

const styles = theme => ({
  root: {
    display: `-webkit-inline-box`,
    width: `fit-content`,
    color: "rgba(0, 0, 0, 0.54)"
  }
});

class UserAccButton extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    width: "",
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    console.log(`handle profile menu open event: ${event.currentTarget}`)
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes, onLogout } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={onLogout}>Logout</MenuItem>
        {/* <MenuItem onClick={this.handleMenuClose}>Account Settings</MenuItem> */}
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem onClick={onLogout}>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Logout</p>
        </MenuItem>
        {/* <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Account Settings</p>
        </MenuItem> */}
      </Menu>
    );

    return (
      <div className={classes.root}>
        {/* */}
        <IconButton
          onClick={this.handleProfileMenuOpen}
          aria-owns={isMenuOpen ? "material-appbar" : undefined}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

UserAccButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserAccButton);
