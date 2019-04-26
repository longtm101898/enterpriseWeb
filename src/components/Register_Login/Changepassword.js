import React, { Component } from "react";
import { update, generateData, isFormValid } from "../utils/Form/formAction";
import FormField from "../utils/Form/formField";
import ewApi from "../../axios-ew";
import { getCurrentUser } from "../../services/authService";
import { toast } from "react-toastify";
import { logout } from "../../actions/user_actions";

class ChangePassword extends Component {
  state = {
    hiddenCurrPass: true,
    userId: "",
    hiddenPass: true,
    formError: false,
    formSuccess: "",
    formData: {
      currentpassword: {
        className: "",
        element: "input",
        value: "",
        config: {
          className: "form-control",
          name: "password_input",
          type: "password",
          placeholder: "Enter your current password"
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          className: "form-control",
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
  componentDidMount() {
    var user = getCurrentUser();
    this.setState({ userId: user.Id });
  }

  updateForm = element => {
    const newFormdata = update(element, this.state.formData, "changepass");
    this.setState({
      formError: false,
      formData: newFormdata
    });
  };
  toggleShowHide = (e, form) => {
    e.preventDefault();
    if (form === "cur") {
      this.setState({ hiddenCurrPass: !this.state.hiddenCurrPass });
    }
    if (form === "new") {
      this.setState({ hiddenPass: !this.state.hiddenPass });
    }
  };

  submitForm = e => {
    e.preventDefault();
    let dataToSubmit = generateData(this.state.formData, "changepass");
    let formIsValid = isFormValid(this.state.formData, "changepass");
    if (formIsValid) {
      ewApi
        .post(
          `account/changepassword?userId=${this.state.userId}`,
          dataToSubmit
        )
        .then(res => {
          this.props.history.push("/login");
          localStorage.removeItem("tokenKey");
          toast.success(res.data);
        });
      this.setState({ formError: false });
    } else {
      toast.error("Form is invalid!!!");
      this.setState({ formError: true });
    }
  };
  render() {
    return (
      <div className="container" style={{ marginLeft: "50px" }}>
        <div className="row justify-content-center">
          {/* <div className="tab-pane" id="edit"> */}
          <div className="col-12 col-md-8 col-sm-10 col-xs-12">
            <h3 className="m-y-2">Change Password</h3>
            <form onSubmit={e => this.submitForm(e)}>
              {this.state.formError && (
                <div className="alert alert-danger">
                  <b>Please check your data again</b>
                  <p>Please input required field (*)</p>
                </div>
              )}
              <b>Current Password *: </b>
              <FormField
                id="currentpassword"
                type={this.state.hiddenCurrPass ? "password" : "input"}
                formdata={this.state.formData.currentpassword}
                change={e => this.updateForm(e)}
                showHide={
                  <div
                    className="input-group-text"
                    onClick={e => this.toggleShowHide(e, "cur")}
                  >
                    <a>
                      <i
                        className={
                          this.state.hiddenCurrPass
                            ? "fa fa-eye-slash"
                            : "fa fa-eye"
                        }
                        aria-hidden="true"
                      />
                    </a>
                    <br />
                  </div>
                }
              />

              <b>New password *:</b>
              <FormField
                type={this.state.hiddenPass ? "password" : "input"}
                id="password"
                formdata={this.state.formData.password}
                change={e => this.updateForm(e)}
                showHide={
                  <div
                    className="input-group-text"
                    onClick={e => this.toggleShowHide(e, "new")}
                  >
                    <a>
                      <i
                        className={
                          this.state.hiddenPass
                            ? "fa fa-eye-slash"
                            : "fa fa-eye"
                        }
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                }
              />
              <input
                type="button"
                className="btn btn-primary"
                onClick={e => this.submitForm(e)}
                defaultValue="Change Password"
              />
            </form>
            {/* </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
