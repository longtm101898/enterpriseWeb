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

class ModalComment extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      comment: {
        element: "textarea",
        value: "",
        config: {
          className: "form-control",
          name: "comment_input",
          type: "text",
          placeholder: "Enter Contribution Comment"
        },
        validation: {},
        valid: false,
        touched: false,
        validationMessage: ""
      },
      status: {
        element: "select",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "facultiesId_input",
          options: [
            { key: 0, value: "Waiting" },
            { key: 1, value: "Cancelled" },
            { key: 2, value: "published" }
          ]
        },
        validation: {},
        valid: false,
        touched: false,
        validationMessage: ""
      }
    },
    title: "",
    description: "",
    fileURL: "",
    imageURL: "",
    dateCreated: ""
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.contributionInfo !== "") {
      var conForm = populateFields(
        this.state.formData,
        nextProps.contributionInfo
      );
      this.setState({
        formData: conForm,
        conId: nextProps.contributionInfo.id,
        title: nextProps.contributionInfo.title,
        description: nextProps.contributionInfo.description,
        fileURL: nextProps.contributionInfo.fileURL,
        imageURL: nextProps.contributionInfo.imageURL,
        dateCreated: nextProps.contributionInfo.dateCreated
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

  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "con");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "con");
    let formIsValid = isFormValid(this.state.formData, "con");
    if (formIsValid) {
      this.props.onSubmit(
        this.state.conId,
        dataToSubmit.comment,
        dataToSubmit.status
      );
      this.props.toggle();
    } else {
      toast.error("Form is invalid!!!")
      this.setState({
        formError: true
      });
    }
  };

  render() {
    const { title, description, fileURL, imageURL, dateCreated } = this.state;
    const styleLabel = { fontWeight: "bold" };
    return (
      <div style={{ margin: "0 auto" }}>
        <Modal isOpen={this.props.show} className="modal-lg">
          <ModalHeader>Student Comment Form</ModalHeader>
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
              <FormField
                id="comment"
                formdata={this.state.formData.comment}
                change={e => this.updateForm(e)}
              />
              <label style={styleLabel}>Status:</label>
              <FormField
                id="status"
                formdata={this.state.formData.status}
                change={e => this.updateForm(e)}
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={e => this.submitForm(e)}>
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

export default ModalComment;
