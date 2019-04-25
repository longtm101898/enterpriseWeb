import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import FormField from "../utils/Form/formField";
import { update, generateData, isFormValid } from "../utils/Form/formAction";
import { loginUser } from "../../actions/user_actions";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    formError: false,
    formSuccess: "",
    formData: {
      email: {
        className: "",
        element: "input",
        value: "",
        config: {
          className: "form-control form-control-user",
          name: "email_input",
          type: "email",
          placeholder: "Enter your email"
        },
        validation: {
          required: true,
          email: true
        },
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
          placeholder: "Enter your password"
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
  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "login");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };
  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "login");
    let formIsValid = isFormValid(this.state.formData, "login");

    if (formIsValid) {
      this.props.onSubmitForm(dataToSubmit);
    } else {
      toast.error("Please fill username & password");
      this.setState({
        formError: true
      });
    }
  };
  render() {
    let authRedirect = null;
    if (this.props.isAuth === true) {
      authRedirect = <Redirect to="/role" />;
    }
    // console.log("auth" + this.props.isAuth)
    // let authRedirect = null;
    return (
      <div className="row">
        {authRedirect}
        <div className="col-lg-6 d-none d-lg-block bg-login-image" />
        <div className="col-lg-6">
          <div className="p-5">
            <div className="text-center">
              <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
            </div>
          </div>
          <form className="user" onSubmit={e => this.submitForm(e)}>
            <FormField
              id="email"
              formdata={this.state.formData.email}
              change={e => this.updateForm(e)}
            />
            <FormField
              id={"password"}
              formdata={this.state.formData.password}
              change={element => this.updateForm(element)}
            />
            <hr />
            <br />
            <button
              className="btn btn-primary btn-user btn-block"
              style={{ marginBottom: 100, marginTop: 50 }}
              onClick={e => this.submitForm(e)}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitForm: dataToSubmit => dispatch(loginUser(dataToSubmit))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login));
