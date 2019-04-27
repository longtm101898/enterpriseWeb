import React, { Component } from "react";
import FormField from "../utils/Form/formField";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateFields
} from "../utils/Form/formAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import { getFormattedDate } from "../../shared/utility";

class ModalComment extends Component {
  state = {
    formError: false,
    formSuccess: "",
    title: "",
    description: "",
    fileURL: "",
    imageURL: "",
    dateCreated: "",
    status:"",
    comment:""
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.contributionInfo !== "") {
      var conForm = populateFields(
        this.state.formData,
        nextProps.contributionInfo
      );
      const dateCreated = getFormattedDate(new Date(nextProps.contributionInfo.dateCreated));
      const {title,description,fileURL,imageURL,comment} = nextProps.contributionInfo;
      var {status} = nextProps.contributionInfo;
      if (status == 0) status = "Waiting"
      else if (status == 1) status = "Cancelled"
      else if (status == 2) status = "Published"
      this.setState({
        formData: conForm,
        conId: nextProps.contributionInfo.id,
        title,
        description,
        fileURL,
        imageURL,
        dateCreated,
        comment,
        status
      });
    } else {
      var conRs = resetFields(this.state.formData);
      this.setState({ formData: conRs, conId: 0 });
    }
  }

  componentDidMount() {
    this.setState({
      modal: this.props.show
    });
  }

  render() {
    const { title, description, fileURL, imageURL, dateCreated, status, comment} = this.state;
    const styleLabel = { fontWeight: "bold" };
    return (
      <div style={{ margin: "0 auto" }}>
        <Modal isOpen={this.props.show} className="modal-lg">
          <ModalHeader>Student Info Form</ModalHeader>
          <ModalBody>
            <form onSubmit={e => this.submitForm(e)}>
              <label style={styleLabel}>Title: </label>
              <p>{title}</p>
              <label style={styleLabel}>Description:</label>
              <p>{description}</p>
              <label style={styleLabel}>File Word: </label>
              <a href={"http://localhost:49763/" + fileURL}> {title}</a>
              <br />
              <label style={styleLabel}>File Image:</label>
              <img
                width="50%"
                height="50%"
                src={"http://localhost:49763/" + imageURL}
                alt={title}
              />
              <br />
              <label style={styleLabel}>Date Created:</label>
              <p>{dateCreated}</p>
              <label style={styleLabel}>Comment: </label>
              <p>{comment}</p>
              <label style={styleLabel}>Status:</label>
              <p>{status}</p>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalComment;
