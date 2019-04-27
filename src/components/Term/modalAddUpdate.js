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

class ModelAddUpdate extends Component {
  state = {
    modal: false,
    formError: false,
    formSuccess: "",
    dateClosing: "",
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
          type: "date"
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

      this.setState({ formData: termForm, termId: nextProps.termInfo.id, closingDate: nextProps.termInfo.closingDate });
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
    let dataToSubmit = generateData(newFormdata, "term");
    var d1 = new Date(dataToSubmit.dateStarted);
    d1.setDate(d1.getDate() + 60)
    this.setState({
      formError: false,
      formData: newFormdata,
      closingDate: d1
    });
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "term");
    let formIsValid = isFormValid(this.state.formData, "term");
    if (formIsValid) {
      if (this.state.termId !== 0) {
        this.props.onSubmit(dataToSubmit, this.state.termId);
      } else {
        this.props.onSubmit(dataToSubmit, 0);
      }
      this.setState({ formError: false });
      this.props.toggle();
    } else {
      toast.error("Form is invalid!!!");
      this.setState({
        formError: true
      });
    }
  };
  handleClosingDate(date){

    return getFormattedDate(date);
  }
  render() {
    const styleLabel = { fontWeight: "bold" };
    const closingDate = new Date(this.state.closingDate);
    return (
      <div style={{ margin: "0 auto" }}>
        <Modal isOpen={this.props.show} toggle={this.props.toggle}>
          <ModalHeader>Add & Update Term</ModalHeader>
          <ModalBody>
            <form onSubmit={e => this.submitForm(e)}>
              {this.state.formError && (
                <div className="alert alert-danger">
                  <b>Please check your data again</b>
                  <p>Please input required field (*)</p>
                </div>
              )}
              <label style={styleLabel}>Name*:</label>
              <FormField
                id="name"
                formdata={this.state.formData.name}
                change={e => this.updateForm(e)}
              />
              <label style={styleLabel}>Date Started*:</label>
              <FormField
                id="dateStarted"
                formdata={this.state.formData.dateStarted}
                change={e => this.updateForm(e)}
              />
                 <label style={styleLabel}>Date Closing:</label>
              {this.handleClosingDate(closingDate)}
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
