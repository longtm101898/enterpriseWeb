import React, { Component } from "react";
import FormField from "../utils/Form/formField";
import { update,
  generateData,
  isFormValid,
  resetFields,
  populateFields } from "../utils/Form/formAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModelAddUpdate extends Component {
    state = {
        modal: false,
        formError: false,
        formSuccess: "",
        formData: {
            name: {
                element: "input",
                value: "",
                config: {
                    className: "form-control",
                    name: "name_input",
                    type: "text",
                    placeholder: "Enter Term Name"
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: ""
            },
            dateStarted: {
                element: "input",
                value: "",
                config: {
                    className: "form-control",
                    name: "datestarted_input",
                    type: "date",
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
        if (nextProps.termInfo !== "") {
          var termForm = populateFields(this.state.formData, nextProps.termInfo);
          
          this.setState({ formData: termForm, termId: nextProps.termInfo.id });
        } else {
          var termRs = resetFields(this.state.formData);
          this.setState({ formData: termRs, termId: 0 });
        }
      }
    
      componentDidMount() {
        this.setState({
          modal: this.props.show
        });
      }
    
      updateForm = element => {
        const newFormdata = update(element, this.state.formData, "term");
        this.setState({
          formError: false,
          formData: newFormdata
        });
      };
    
      submitForm = e => {
        e.preventDefault();
        let dataToSubmit = generateData(this.state.formData, "term");
        let formIsValid = isFormValid(this.state.formData, "term");
        if (formIsValid) {
          if (this.state.termId !== 0) {
            console.log("update");
            this.props.onSubmit(dataToSubmit, this.state.termId)
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
            <div style={{ margin: '0 auto' }}>
                <Modal isOpen={this.props.show} toggle={this.props.toggle}>
                    <ModalHeader>Add & Update Term</ModalHeader>
                    <ModalBody>
                        <form onSubmit={e => this.submitForm(e)}>
                        <FormField
                        id="name"
                        formdata={this.state.formData.name}
                        change={e => this.updateForm(e)}
                    />
                    <FormField
                        id="dateStarted"
                        formdata={this.state.formData.dateStarted}
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
export default ModelAddUpdate;