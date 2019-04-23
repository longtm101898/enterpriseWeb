import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { update, populateOptionFields } from "../utils/Form/formAction";
import FormField from "../utils/Form/formField";
import { getFormattedDate } from "../../shared/utility";

class ModalDownload extends Component {
  state = {
    formError: false,
    formSuccess: "",
    termData: null,
    formData: {
      term: {
        element: "select",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "term_input",
          options: [],
          label: "term"
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
    if (nextProps.term !== "") {
      var term = populateOptionFields(
        this.state.formData,
        nextProps.term,
        "term"
      );
      this.setState({ formData: term });
    } else {
    }
  }
  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "term");

    let i = 0,
      termData;
    for (i; i < this.props.term.length; i++) {
      if (
        parseInt(this.props.term[i].id) === parseInt(newFormdata.term.value)
      ) {
        termData = this.props.term[i];
      }
    }
    this.setState({
      formError: false,
      formData: newFormdata,
      termData
    });
  };
  submitDownload = () => {
    console.log(this.state.termData);
  };
  componentDidMount() {
    this.setState({
      modal: this.props.show
    });
  }
  render() {
    const { termData } = this.state;
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
            <form>
              <b>Term: </b>
              <FormField
                id={"term"}
                formdata={this.state.formData.term}
                change={element => this.updateForm(element)}
              />
              {termData && (
                <React.Fragment>
                  <p>
                    <b>Term name: </b> {termData.name}
                  </p>
                  <p>
                    <b>Start Date: </b>{" "}
                    {getFormattedDate(new Date(termData.dateStarted))}
                  </p>
                  <p>
                    <b>Closing Date: </b>{" "}
                    {getFormattedDate(new Date(termData.closingDate))}
                  </p>
                </React.Fragment>
              )}
            </form>
          </ModalBody>
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
