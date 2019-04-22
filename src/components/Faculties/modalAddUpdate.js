import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormField from "../utils/Form/formField";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateFields
} from "../utils/Form/formAction";

class ModalAddUpdate extends Component {
  state = {
    modal: false,
    formError: false,
    formSuccess: "",
    formData: {
      name: {
        element: "input",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "name_input",
          type: "name",
          placeholder: "Enter faculties name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      description: {
        element: "input",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "description_input",
          type: "description",
          placeholder: "Enter faculties description"
        },
        validation: {},
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.facultiesInfo !== "") {
      var facForm = populateFields(this.state.formData, nextProps.facultiesInfo);
      this.setState({ formData: facForm, facId: nextProps.facultiesInfo.id });
    } else {
      var facRs = resetFields(this.state.formData);
      this.setState({ formData: facRs, facId: 0 });
    }
  }

  componentDidMount() {
    this.setState({
      modal: this.props.show
    });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "role");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "fac");
    let formIsValid = isFormValid(this.state.formData, "fac");
    if (formIsValid) {
      if (this.state.roleId !== 0) {
        console.log("update");
        this.props.onSubmit(dataToSubmit, this.state.facId)
      }else{
        this.props.onSubmit(dataToSubmit,0)
      }
      // this.props.onSubmitForm(dataToSubmit);
      this.props.toggle();
    } else {
      this.setState({
        formError: true
      });
    }
  
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggle}>
          <ModalHeader>Faculties add & update</ModalHeader>
          <ModalBody>
            <form onSubmit={e => this.submitForm(e)}>
              <label>Name:</label>
              <FormField
                id={"name"}
                formdata={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
               <label>Description:</label>
              <FormField
                id={"description"}
                formdata={this.state.formData.description}
                change={element => this.updateForm(element)}
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

export default ModalAddUpdate;
