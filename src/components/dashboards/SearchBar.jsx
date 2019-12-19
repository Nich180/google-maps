import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "./SearchIcon";
// import IntegrationReactSelect from './autoCompleteNav';
import IntegrationReactSelect from "./reactSelect";
//../../services/Requests/Version2/OwnersAPICalls
import FilterSidePanel from "../map/filterComponents/filterSidePanel";

const styles = theme => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "-webkit-fill-available",

    [theme.breakpoints.down("sm")]: {
      width: "-webkit-fill-available",
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
    background: `pink`
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
  }

  render() {
    const {
      classes,
      onSingle,
      onSelectChange,
      InputChange,
      options
    } = this.props;

    return (
      <Paper className={classes.root} elevation={1}>
        {/*d
        !FilterSidePanel opens up a side panel containing filter settings 
         */}
        <FilterSidePanel />
        <div style={{ width: `-webkit-fill-available` }}>
          <IntegrationReactSelect
            onSingle={onSingle}
            InputChange={InputChange}
            onSelectChange={onSelectChange}
            choices={options}
          />
        </div>
        {/*
         *Search icon within the search bar top center within the NavBar
         */}
        <SearchIcon />
      </Paper>
    );
  }
}

export default withStyles(styles)(SearchBar);
