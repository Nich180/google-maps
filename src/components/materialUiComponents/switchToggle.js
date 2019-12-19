import React from "react";
import Switch from "@material-ui/core/Switch";

class Switches extends React.Component {
  render() {
    const { propHandle, checked } = this.props;

    return (
      <React.Fragment>
        <Switch
          checked={checked}
          onChange={propHandle("checkedA")}
          value="checkedA"
        />
      </React.Fragment>
    );
  }
}

export default Switches;
