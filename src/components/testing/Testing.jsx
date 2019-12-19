import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import EnhancedTable from "../map/mapComponents/transactionCompons/transactionModals/getAllContacts/enhancedListsTable";
import Modal from "@material-ui/core/Modal";
import MapPage from "../../routes/pages/mapPage"
import TransactionForm from "../map/mapComponents/transactionCompons/Transaction";
class Testing extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
      open: false
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <React.Fragment>
        <MapPage />
      </React.Fragment>
    );
  }
}

export default Testing;
