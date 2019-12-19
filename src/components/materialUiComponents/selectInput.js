import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit,
    width: "100%"
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SelectInput extends React.Component {
  state = {
    function: "",
    labelWidth: 0
  };

  componentDidMount() {}

  handleChange = event => {
    console.log(event.target);
    this.setState({ function: event.target.value });
  };

  render() {
    const { classes, settings } = this.props;

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel variant="filled" htmlFor="function-simple">
            Function Select
          </InputLabel>
          <Select
            variant="filled"
            value={this.state.function}
            onChange={this.handleChange}
            inputProps={{
              name: "Function",
              id: "age-simple"
            }}
          >
            <MenuItem value={"all"}>all</MenuItem>
            <MenuItem value={"residential"}>residential</MenuItem>
            <MenuItem value={"hotel"}>hotel</MenuItem>
            <MenuItem value={"office"}>office</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

SelectInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectInput);
