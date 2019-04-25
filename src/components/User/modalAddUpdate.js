import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormField from "../utils/Form/formField";
import { connect } from "react-redux";
import { getRoleData } from "../../actions/role_actions";
import { getFacultiesData } from "../../actions/faculties_actions";
import Dropzone from "react-dropzone";
import ewApi from "../../axios-ew";
import {
  update,
  generateData,
  isFormValid,
  resetFields,
  populateFields,
  populateOptionFields
} from "../utils/Form/formAction";
import { toast } from "react-toastify";
class modalAddUpdate extends Component {
  state = {
    modal: false,
    formError: false,
    formSuccess: "",
    formData: {
      fullName: {
        element: "input",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "name_input",
          type: "text",
          placeholder: "Enter user name"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      email: {
        element: "input",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "email_input",
          type: "email",
          placeholder: "Enter user email"
        },
        validation: {},
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "password_input",
          type: "password",
          placeholder: "Enter user password"
        },
        validation: {},
        valid: false,
        touched: false,
        validationMessage: ""
      },
      phoneNumber: {
        element: "input",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "phoneNumber_input",
          type: "text",
          placeholder: "Enter user PhoneNumber"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      status: {
        element: "select",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "status_input",
          options: [{ key: 0, value: "InActive" }, { key: 1, value: "Active" }]
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      roles: {
        element: "select",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "roles_input",
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
      facultiesId: {
        element: "select",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "facultiesId_input",
          options: []
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
    if (nextProps.userInfo !== "") {
      for (var i = 0; i < this.props.roles.data.length; i++) {
        if (this.props.roles.data[i].name === nextProps.userInfo.roles[0]) {
          nextProps.userInfo.roles = this.props.roles.data[i].id;
        }
      }
      var userForm = populateFields(this.state.formData, nextProps.userInfo);
      this.setState({ formData: userForm, userId: nextProps.userInfo.id });
    } else {
      var userRs = resetFields(this.state.formData);
      this.setState({ formData: userRs, userId: 0 });
    }
  }

  async componentDidMount() {
    await this.props.dispatch(getRoleData());
    await this.props.dispatch(getFacultiesData());

    this.setState({
      modal: this.props.show
    });
    var newuser = populateOptionFields(
      this.state.formData,
      this.props.roles.data,
      "roles"
    );
    this.setState({
      formData: newuser
    });
    var newfacultiesId = populateOptionFields(
      this.state.formData,
      this.props.faculties.data,
      "facultiesId"
    );
    this.setState({
      formData: newfacultiesId
    });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "user");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "user");
    let formIsValid = isFormValid(this.state.formData, "user");
    for (var i = 0; i < this.props.roles.data.length; i++) {
      if (this.props.roles.data[i].id === dataToSubmit.roles) {
        dataToSubmit.roles = [this.props.roles.data[i].name];
      }
    }
    if (formIsValid) {
      if (this.state.userId !== 0) {
        this.props.onSubmit(dataToSubmit, this.state.userId);
      } else {
        this.props.onSubmit(dataToSubmit, "");
      }
      this.props.toggle();
    } else {
      toast.error("Form is unvalid!!!")
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
      ewApi.post("upload", formData).then(res => {
        if (ext === ".docx" || ext === ".doc") {
          console.log("word");
        }
        if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") {
          this.setState({ img: res.data });
        }
      });
    } else {
      alert("The file is invalid !!!");
    }
  };

  render() {
    const dropzoneStyled = {
      border: "2px dashed #0087F7",
      borderRadius: "5px",
      background: "#ebd5d5",
      cursor: "pointer",
      padding: "54px 54px"
    };
    const styleLabel = { fontWeight: "bold" };
    return (
      <div>
        <Modal isOpen={this.props.show} toggle={this.props.toggle}>
          <ModalHeader>User add & update</ModalHeader>
          <ModalBody>
            <form onSubmit={e => this.submitForm(e)}>
              <label style={styleLabel}>Full name:</label>
              <FormField
                id={"fullName"}
                formdata={this.state.formData.fullName}
                change={element => this.updateForm(element)}
              />
              <label style={styleLabel}>Email:</label>
              <FormField
                id={"email"}
                formdata={this.state.formData.email}
                change={element => this.updateForm(element)}
              />
              <label style={styleLabel}>Password:</label>
              <FormField
                id={"password"}
                formdata={this.state.formData.password}
                change={element => this.updateForm(element)}
              />
              <label style={styleLabel}>Phone Number:</label>
              <FormField
                id={"phoneNumber"}
                formdata={this.state.formData.phoneNumber}
                change={element => this.updateForm(element)}
              />
              <label style={styleLabel}>Avatar:</label>
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
              <label style={styleLabel}>Status:</label>
              <FormField
                id={"status"}
                formdata={this.state.formData.status}
                change={element => this.updateForm(element)}
              />
              <label style={styleLabel}>Role:</label>
              <FormField
                id={"roles"}
                formdata={this.state.formData.roles}
                change={element => this.updateForm(element)}
              />
              <label style={styleLabel}>Faculties:</label>
              <FormField
                id={"facultiesId"}
                formdata={this.state.formData.facultiesId}
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
const mapStateToProps = state => {
  return {
    roles: state.role,
    faculties: state.faculties
  };
};
export default connect(mapStateToProps)(modalAddUpdate);
