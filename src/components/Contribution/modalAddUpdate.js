import React, { Component } from "react";
import FormField from "../utils/Form/formField";
import Dropzone from "react-dropzone";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateFields
} from "../utils/Form/formAction";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ewApi from "../../axios-ew";

class ModelAddUpdate extends Component {
  state = {
    term: [],
    word: "",
    img: "",
    formError: false,
    formSuccess: "",
    formData: {
      title: {
        element: "input",
        value: "",
        config: {
          className: "form-control",
          name: "title_input",
          type: "text",
          placeholder: "Enter Contribution Title"
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
          className: "form-control",
          name: "description_input",
          type: "text",
          placeholder: "Enter Contribution Description"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      }
    },
    disableButton: true
  };
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.term !== null){
      this.setState({term: nextProps.term});
    }
    if (nextProps.contributionInfo !== "") {
      var conForm = populateFields(
        this.state.formData,
        nextProps.contributionInfo
      );
      
      this.setState({
        formData: conForm,
        conId: nextProps.contributionInfo.id
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
    const { img, word } = this.state;
    let dataToSubmit = generateData(this.state.formData, "con");
    let formIsValid = isFormValid(this.state.formData, "con");
    if (formIsValid) {
      if (this.state.conId !== 0) {
        this.props.onSubmit(dataToSubmit, this.state.conId, img, word);
      } else {
        this.props.onSubmit(dataToSubmit, 0, img, word);
      }
      this.props.toggle();
    } else {
      this.setState({
        formError: true
      });
    }
  };

  handleFile = acceptedFiles => {
    if (acceptedFiles.length !== 0) {
      var ext = acceptedFiles[0].name.substring(
        acceptedFiles[0].name.lastIndexOf(".")
      );

      let formData = new FormData();
      formData.append("files", acceptedFiles[0], acceptedFiles[0].name);
      // var fileData = File(acceptedFiles[0])
     var term = this.state.term;
      ewApi.post(`upload?termName=${term.name}&startDate=${term.dateStarted}&closingDate=${term.closingDate}`, formData).then(res => {
        if (ext === ".docx" || ext === ".doc") {

          this.setState({ word: res.data });
        }
        if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
          this.setState({ img: res.data });
        }
      });
    } else {
      alert("The file is invalid !!!");
    }
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      disableButton: !value
    });
  };

  render() {
    const dropzoneStyled = {
      border: "2px dashed #0087F7",
      borderRadius: "5px",
      background: "#ebd5d5",
      cursor: "pointer",
      padding: "54px 54px"
    };
    const { disableButton } = this.state;
    const styleLabel = {fontWeight: "bold"};
    return (
      <div style={{ margin: "0 auto" }}>
        <Modal isOpen={this.props.show} className="modal-lg">
          <ModalHeader toggle={this.props.toggle}>Student Submit & Update Form</ModalHeader>
          <ModalBody>
            <form onSubmit={e => this.submitForm(e)}>
              <label style={styleLabel}>Title:</label>
              <FormField
                id="title"
                formdata={this.state.formData.title}
                change={e => this.updateForm(e)}
              />
               <label style={styleLabel}>Description:</label>
              <FormField
                id="description"
                formdata={this.state.formData.description}
                change={e => this.updateForm(e)}
              />
              <label style={styleLabel}>Word file: </label>
              <Dropzone onDrop={this.handleFile} accept=".doc,.docx">
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <section>
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      style={dropzoneStyled}
                    >
                      <input {...getInputProps()} />
                      <p>
                        {acceptedFiles.length !== 0
                          ? ""
                          : "Drag 'n' drop some files here, or click to select files"}
                      </p>
                      <ul>
                        {acceptedFiles &&
                          acceptedFiles.map(file => (
                            <li key={file.path}>
                              <i className="far fa-file-word" /> {file.path}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </section>
                )}
              </Dropzone>
              <label style={styleLabel}>Image File: </label>
              <Dropzone onDrop={this.handleFile} accept="image/*">
                {({ getRootProps, getInputProps, acceptedFiles }) => (
                  <section>
                    <div {...getRootProps()} style={dropzoneStyled}>
                      <input {...getInputProps()} />
                      <p>
                        {acceptedFiles.length !== 0
                          ? ""
                          : "Drag 'n' drop some files here, or click to select files"}
                      </p>
                      <ul>
                        {acceptedFiles &&
                          acceptedFiles.map(file => (
                            <li key={file.path}>
                              <i className="far fa-file-image" /> {file.path}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </section>
                )}
              </Dropzone>
              <div className="form-group">
                <input
                  type="checkbox"
                  id="termandcondition"
                  name="termandcondition"
                  onChange={this.handleChange}
                />
                <label>I agree to the Terms and Conditions</label>
                <div>
                  <ul>
                    <li>Student contributions must be in word format and be smaller than 1 MB
                    Images submitted by students must have high image quality such as photograph, ...</li>
                    <li>Images must be carefully reviewed before uploading.</li> 
                    <li>Images must not contain violent and sexy information.</li> 
                    <li>Images uploaded by students must be smaller than 20 MB.</li> 
                    <li> Students can upload contributions within 45 days from the start of each term to the closure date.</li> 
                    <li> Students can edit contributions for 2 months from the start of each term to the final closure date.</li> 
                    <li> Students can upload many contributions. Each contribution can only be uploaded to one-word file and one image file.</li> 
                    <li>The approved contributions by marketing coordinator will not be updated anymore.</li> 
                    <li>Students should read the term and condition carefully before submitting.</li> 
                  </ul>
                  </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={e => this.submitForm(e)}
              disabled={disableButton}
            >
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

export default ModelAddUpdate
