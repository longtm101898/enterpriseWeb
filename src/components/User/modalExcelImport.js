import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";

class ModalExcelImport extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      role: {
        element: "select",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "role_input",
          options: [],
          label: "role"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  submitExcel = e => {};
  render() {
    return (
      <div style={{ margin: "0 auto" }}>
        <Modal
          isOpen={this.props.show}
          className="modal-lg"
          toggle={this.props.toggle}
          centered
        >
          <ModalHeader toggle={this.props.toggle}>Download by Term</ModalHeader>
          <ModalBody>
            <form>"HEELOWORLD"</form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={e => this.submitExcel(e)}>
              Submit
            </Button>
            <Button color="danger" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExcelImport;
