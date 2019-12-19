import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AutoCompleteInput from "../../materialUiComponents/autoCompleteInput";
import StandardInput from "../../materialUiComponents/input";
import RangeSlider from "../../materialUiComponents/rangeInput";
import Switches from "../../materialUiComponents/switchToggle";

const styles = theme => ({
  root: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      marginTop: theme.spacing.unit * 3
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "100%",
      marginTop: theme.spacing.unit * 3
    },

    [theme.breakpoints.up("xl")]: {
      width: "100%",
      marginTop: theme.spacing.unit * 3
    }
  }
});

class SelectFilters extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    checkedA: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    const { filterData } = this.props;

    function InputFunctions(props) {
      const { filterData } = props;

      // !FilterData
      //{filterId: 3, filterName: "Building Name", filterHandle: "Input", etc..

      switch (filterData.filterName) {
        case "Postal Filter":
          return <AutoCompleteInput settings={filterData} />;
        case "Building Owner":
          return <AutoCompleteInput settings={filterData} />;
        case "Building height":
          return <AutoCompleteInput settings={filterData} />;
        case "Building Name":
          return <StandardInput settings={filterData} />;

        default:
          return <div> null </div>;
      }
    }

    function RangeFunctions(props) {
      const { filterData } = props;

      switch (filterData.filterName) {
        case "Height Range":
          return <RangeSlider settings={filterData} />;

        default:
          return <div> null </div>;
      }
    }

    function ToggleFunctions(props) {
      const { filterData, toggle, checked } = props;

      switch (filterData.filterName) {
        case "Buildings with contact":
          return (
            <Switches
              checked={checked}
              propHandle={toggle}
              settings={filterData}
            />
          );

        default:
          return <div> null </div>;
      }
    }

    //Filter Select functions
    function SelectFunctions(props) {
      const { filterData, vision, passing } = props;
      let filterName = filterData.filterName;

      switch (filterName) {
        case "Function Select":
          return <div> to do </div>;
        default:
          return null;
      }
    }
    return (
      <React.Fragment>
        {filterData.filterHandle === "Toggle" ? (
          <ToggleFunctions
            checked={this.state.checkedA}
            toggle={event => this.handleChange(event)}
            filterData={filterData}
          />
        ) : filterData.filterHandle === "Range" ? (
          <RangeFunctions filterData={filterData} />
        ) : filterData.filterHandle === "Input" ? (
          <InputFunctions filterData={filterData} />
        ) : filterData.filterHandle === "Select" ? (
          <SelectFunctions filterData={filterData} />
        ) : (
          <div />
        )}
      </React.Fragment>
    );
  }
}

SelectFilters.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectFilters);
