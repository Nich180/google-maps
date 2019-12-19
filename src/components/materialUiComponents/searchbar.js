import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import IntegrationReactSelect from "../materialUiComponents/autoComplete";
import UserAccButton from "../dashboards/userAccButton";

import Request from "../../services/Requests/Version2/OwnersAPICalls";
import FilterSidePanel from "../map/filterComponents/filterSidePanel";
import OwnerSidePanel from "../map/ownersComponent/ownersSidePanel";

const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "fit-content",

    [theme.breakpoints.down("sm")]: {
      width: "fit-content",
      height: "40px"
    }
  },
  drawerRoot: {
    background: "red!important"
  },
  input: {
    marginLeft: 8,
    flex: "none",

    [theme.breakpoints.down("sm")]: {
      width: "40%",
      height: "40px"
    }
  },

  accountButton: {
    width: "10%",
    background: "red"
  },
  iconButton: {
    padding: 12
  },
  accIcon: {
    padding: 0
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
});

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: [],
      owner: "",
      options: [{}]
    };
    this.handleNavChange = this.handleNavChange.bind(this);
  }

  handleSearchQuery = query => {
    query.persist();
  };

  handleNavChange = async (name, event) => {
    // this.setState({ [name]: event.target.value });
    const response = await Request.POSTownersearch(event);
    console.log(response);
    this.setState({ owner: event, options: response });
  };
  render() {
    const { classes, onLogout } = this.props;
    console.log(this.state.owner);

    return (
      <Paper className={classes.root} elevation={1}>
        {/*
        !FilterSidePanel opens up a side panel containing filter settings 
         */}
        <FilterSidePanel />
        <div style={{ width: `250px` }}>
          <IntegrationReactSelect
            value={this.state.owner}
            inputChange={event => this.handleNavChange("owner", event)}
            entries={this.state.options}
          />
        </div>
        {/*
         *Search icon within the search bar top center within the NavBar
         */}

        {/* <IconButton className={classes.accIcon} aria-label="Search" />
        <OwnerSidePanel /> */}
      </Paper>
    );
  }
}

// <Divider className={classes.divider} />

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SearchBar);
