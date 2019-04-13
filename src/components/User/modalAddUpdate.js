import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import FormField from "../utils/Form/formField";
import { connect } from "react-redux";
import { getRoleData } from "../../actions/role_actions";
import {getFacultiesData} from "../../actions/faculties_actions";
import {
    update,
    generateData,
    isFormValid,
    resetFields,
    populateFields,
    populateOptionFields
  } from "../utils/Form/formAction";
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
              validation: {
               
              },
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
            avatar:{
              element: "input",
              value: "",
              config: {
                className: "form-control form-control-user",
                name: "avatar_input",
                type: "text",
                placeholder: "Enter user Avatar"
              },
              validation: {
                required: true
              },
              valid: false,
              touched: false,
              validationMessage: ""
            },
            status:{
              element: "select",
              value: "",
              config: {
                className: "form-control form-control-user",
                name: "status_input",
                options:[
                  {"key": 0, "value": "InActive"},
                  {"key": 1, "value": "Active"}
                ]
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
              validationMessage: "",
            },
            faculties: {
              element: "select",
              value: "",
              config: {
                className: "form-control form-control-user",
                name: "facultiesId_input",
                options: [],
              },
              validation: {
                required: true
              },
              valid: false,
              touched: false,
              validationMessage: ""
            },
        }
    };
    componentWillReceiveProps(nextProps) {
      console.log(nextProps);
        if (nextProps.userInfo !== "") {
          var userForm = populateFields(this.state.formData, nextProps.userInfo);
          this.setState({ formData: userForm, userId: nextProps.userInfo.id});
        } else {
          var userRs = resetFields(this.state.formData);
          this.setState({ formData: userRs, userId: 0 });
        }
      }
      
    async componentDidMount() {
      await this.props.dispatch(getRoleData());
      await this.props.dispatch(getFacultiesData());
      
        this.setState({
          modal: this.props.show,
        });
        var newuser = populateOptionFields(this.state.formData,this.props.roles.data,"roles");
        this.setState({
          formData : newuser
       })
       var newfaculties = populateOptionFields(this.state.formData,this.props.faculties.data,"faculties");
        this.setState({
          formData : newfaculties
       })
      console.log(this.props.faculties.data)
        
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
        if (formIsValid) {
          if (this.state.roleId !== 0) {
            console.log("update");
            this.props.onSubmit(dataToSubmit, this.state.userId)
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
      // var task = JSON.parse(localStorage.getItem("Role"));
      // console.log(this.state.)
        return (
            <div>
                <Modal isOpen={this.props.show} toggle={this.props.toggle}>
                    <ModalHeader>User add & update</ModalHeader>
                    <ModalBody>
                        <form onSubmit={e => this.submitForm(e)}>
                        <FormField
                            id={"fullName"}
                            formdata={this.state.formData.fullName}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"email"}
                            formdata={this.state.formData.email}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"password"}
                            formdata={this.state.formData.password}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"phoneNumber"}
                            formdata={this.state.formData.phoneNumber}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"avatar"}
                            formdata={this.state.formData.avatar}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"status"}
                            formdata={this.state.formData.status}
                            change={element => this.updateForm(element)}
                        />
                        <FormField
                            id={"roles"}
                            formdata={this.state.formData.roles}
                            change={element => this.updateForm(element)}
                        /> 
                        <FormField
                            id={"faculties"}
                            formdata={this.state.formData.faculties}
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