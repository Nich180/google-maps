import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//Http services imports
import LoadingIcon from "../animations/loadingIcon";
import Grid from "@material-ui/core/Grid";

class Form extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    username: "",
    password: "",
  };

  submissionButton(type, label, variant, color, Form) {
    const isLoading = this.state.displayLoadingIcon;

    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          <Button
            type={type}
            style={{ marginTop: "0px", width: "100%", color: "white" }}
            variant={variant}
            color={color}
            form={Form}
          >
            {label}
          </Button>
        </Grid>
        <Grid item lg={12}>
          <div>{isLoading ? <LoadingIcon /> : null}</div>
        </Grid>
      </Grid>
    );
  }

  renderInput(placeholder, name, label, type) {
    return (
      <TextField
        style={{ borderRadius: "15px", width: "100%" }}
        type={type}
        label={label}
        name={name}
        placeholder={placeholder}
      />
    );
  }
}

export default Form;
