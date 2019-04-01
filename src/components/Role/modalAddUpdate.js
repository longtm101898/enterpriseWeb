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
          placeholder: "Enter role name"
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
          placeholder: "Enter role description"
        },
        validation: {},
        valid: false,
        touched: false,
        validationMessage: ""
      }
    }
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.roleInfo !== "") {
      var roleForm = populateFields(this.state.formData, nextProps.roleInfo);
      this.setState({ formData: roleForm, roleId: nextProps.roleInfo.id });
    } else {
      var roleRest = resetFields(this.state.formData);
      this.setState({ formData: roleRest, roleId: "" });
      // var roleReset = populateFields(this.state.formData, nextProps.roleInfo);
      // this.setState({ formData: roleForm });
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
    let dataToSubmit = generateData(this.state.formData, "role");
    let formIsValid = isFormValid(this.state.formData, "role");
    if (formIsValid) {
     
      if(this.state.roleId !== ""){
        console.log("update")
        this.props.onSubmit(dataToSubmit, this.state.roleId);
      }else{
        this.props.onSubmit(dataToSubmit);
      }
      // this.props.onSubmitForm(dataToSubmit);
    } else {
      this.setState({
        formError: true
      });
    }
    this.props.toggle();
  };

  render() {
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggle}>
          <ModalHeader>Role add</ModalHeader>
          <ModalBody>
            <form onSubmit={e => this.submitForm(e)}>
              <FormField
                id={"name"}
                formdata={this.state.formData.name}
                change={element => this.updateForm(element)}
              />
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
