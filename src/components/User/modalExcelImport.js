import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import {
  populateOptionFields,
  update,
  generateData
} from "../utils/Form/formAction";
import FormField from "../utils/Form/formField";
import Dropzone from "react-dropzone";
import ewApi from "../../axios-ew";

let formData = new FormData();
class ModalExcelImport extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      role: {
        element: "select",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "role_input",
          options: [],
          label: "role"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      faculties: {
        element: "select",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "faculties_input",
          options: [],
          label: "faculties"
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
    if (nextProps.faculties) {
      var faculties = populateOptionFields(
        this.state.formData,
        nextProps.faculties,
        "faculties"
      );
      this.setState({ formData: faculties });
    }
    if (nextProps.role) {
      var role = populateOptionFields(
        this.state.formData,
        nextProps.role,
        "role"
      );
      this.setState({ formData: role });
    }
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "excel");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };

  handleFile = acceptedFiles => {
    if (acceptedFiles.length !== 0) {
      formData.append("files", acceptedFiles[0], acceptedFiles[0].name);
    } else {
      alert("The file is invalid !!!");
    }
  };

  submitExcel = async e => {
    let { role, faculties } = generateData(this.state.formData, "excel");
    await ewApi
      .post(
        `upload/importmultiuserbyexcel?facultiesId=${faculties}&roleId=${role}`,
        formData
      )
      .then(res => {
        toast.success(res.data);
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
    return (
      <div style={{ margin: "0 auto" }}>
        <Modal isOpen={this.props.show} toggle={this.props.toggle} centered>
          <ModalHeader toggle={this.props.toggle}>Import Excel</ModalHeader>
          <ModalBody>
            <form>
              <div className="row">
                <div className="col-12 col-xs-12 col-md-12">
                  <b>Role: </b>
                  <FormField
                    id={"role"}
                    formdata={this.state.formData.role}
                    change={element => this.updateForm(element)}
                  />

                  <b>Faculties: </b>
                  <FormField
                    id={"faculties"}
                    formdata={this.state.formData.faculties}
                    change={e => this.updateForm(e)}
                  />
                  <b>Excel File: </b>
                  <Dropzone onDrop={this.handleFile} accept=".xlsx, .xls">
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
                </div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={e => this.submitExcel(e)}>
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

export default ModalExcelImport;
