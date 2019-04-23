import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalDownload extends Component {
  submitDownload = () => {};
  componentDidMount() {
    this.setState({
      modal: this.props.show
    });
  }
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
          <ModalBody>GetTerm Outdated to download</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={e => this.submitDownload(e)}>
              Download
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

export default ModalDownload;
