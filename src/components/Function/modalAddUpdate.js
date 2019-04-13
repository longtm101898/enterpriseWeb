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
            placeholder: "Enter function name"
          },
          validation: {
            required: true
          },
          valid: false,
          touched: false,
          validationMessage: ""
        },
        url: {
            element: "input",
            value: "",
            config: {
              className: "form-control form-control-user",
              name: "url_input",
              type: "url",
              placeholder: "Enter function URL"
            },
            validation: {
              required: true
            },
            valid: false,
            touched: false,
            validationMessage: ""
          },
        parentId: {
        element: "input",
        value: "",
        config: {
            className: "form-control form-control-user",
            name: "parentId_input",
            type: "parentId",
            placeholder: "Enter parent Id"
        },
        validation: {},
        valid: false,
        touched: false,
        validationMessage: ""
        },
        iconCss: {
            element: "input",
            value: "",
            config: {
              className: "form-control form-control-user",
              name: "iconCss_input",
              type: "iconCss",
              placeholder: "Enter Icon Css"
            },
            validation: {
              required: true
            },
            valid: false,
            touched: false,
            validationMessage: ""
        },
        sortOrder: {
            element: "input",
            value: "",
            config: {
              className: "form-control form-control-user",
              name: "sortOrder_input",
              type: "sortOrder",
              placeholder: "Enter sort Order"
            },
            validation: {
              required: true
            },
            valid: false,
            touched: false,
            validationMessage: ""
        },
        status: {
            element: "input",
            value: "",
            config: {
              className: "form-control form-control-user",
              name: "status_input",
              type: "status",
              placeholder: "Enter status"
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
      if (nextProps.functionInfo !== "") {
        var funForm = populateFields(this.state.formData, nextProps.functionInfo);
        this.setState({ formData: funForm, funId: nextProps.functionInfo.id });
      } else {
        var funRs = resetFields(this.state.formData);
        this.setState({ formData: funRs, funId: 0 });
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
      let dataToSubmit = generateData(this.state.formData, "fun");
      let formIsValid = isFormValid(this.state.formData, "fun");
      if (formIsValid) {
        if (this.state.roleId !== 0) {
          console.log("update");
          this.props.onSubmit(dataToSubmit, this.state.funId)
        }else{
          this.props.onSubmit(dataToSubmit)
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
            <ModalHeader>Function add & update</ModalHeader>
            <ModalBody>
              <form onSubmit={e => this.submitForm(e)}>
                <FormField
                  id={"name"}
                  formdata={this.state.formData.name}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"url"}
                  formdata={this.state.formData.url}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"parentId"}
                  formdata={this.state.formData.parentId}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"iconCss"}
                  formdata={this.state.formData.iconCss}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"sortOrder"}
                  formdata={this.state.formData.sortOrder}
                  change={element => this.updateForm(element)}
                />
                <FormField
                  id={"status"}
                  formdata={this.state.formData.status}
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