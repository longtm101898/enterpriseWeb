import React, { Component } from 'react';
import FormField from '../utils/Form/formField';
import { getUserDataById } from '../../actions/user_actions';
import { getCurrentUser } from '../../services/authService';
import {connect} from 'react-redux';
import {
    update,
    generateData,
    isFormValid,
    resetFields,
    populateFields
  } from "../utils/Form/formAction";

class userProfile extends Component {
	state = {
		formError: false,
		formSuccess: '',
		formData: {
			fullName: {
				element: 'input',
				value: '',
				config: {
					className: 'form-control',
					name: 'full_name',
					type: 'text',
					placeholder: 'Enter User Fullname'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			email: {
				element: 'input',
				value: '',
				config: {
					className: 'form-control',
					name: 'email_input',
					type: 'text',
                    placeholder: 'Enter User Email',
                    disabled: true
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			phoneNumber: {
				element: 'input',
				value: '',
				config: {
					className: 'form-control',
					name: 'phonenumber_input',
					type: 'text',
					placeholder: 'Enter User Phone Number'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			facultiesId: {
				element: 'input',
				value: '',
				config: {
					className: 'form-control',
					name: 'faculitiesId_input',
					disabled: true,
					type: 'text'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			}
		}
    };
    updateForm = (element) =>{
        const newFormdata = update(element, this.state.formData, "user");
        this.setState({
          formError: false,
          formData: newFormdata
        });
    }
    handleSubmit = (userSubmit,userId) => {
        console.log(userSubmit)
        console.log(userId)
    }
    submitForm = e => {
        e.preventDefault();
        let dataToSubmit = generateData(this.state.formData, "user");
        let formIsValid = isFormValid(this.state.formData, "user");
        if (formIsValid) {
          if (this.state.userId !== 0) {
            console.log("update");
           this.handleSubmit(dataToSubmit, this.state.userId)
          }else{
            this.handleSubmit(dataToSubmit)
          }
        } else {
          this.setState({
            formError: true
          });
        }
      
      };
    componentWillMount(){
        var user = getCurrentUser();
        console.log(user)
        this.setState({
            userId : user.Id
        })
    }
	 componentDidMount = async () => {
        await this.props.dispatch(getUserDataById(this.state.userId));
        
        console.log(this.props.user);
            var userForm = populateFields(this.state.formData,this.props.user );
            this.setState({ formData: userForm, user: this.props.user});
        
	}
	render() {
		return (
			<div className="container text-left" style={{marginLeft: '25px'}}>
				<div className="row m-y-2">
					<div className="col-lg-4 pull-lg-8 text-xs-center">
						<label for="file-input">
						<img src="//placehold.it/200" className="m-x-auto img-fluid img-circle" alt="avatar" />
						</label>		
						<input type="file" id="file-input" style={{display: "none"}} />
					</div>
					<div className="col-lg-8 push-lg-4">
							<div className="tab-pane" id="edit">
								<h4 className="m-y-2">Edit Profile</h4>
								<form role="form">
								<label>Fullname:</label>
									<FormField
										id="fullName"
										formdata={this.state.formData.fullName}
										change={(e) => this.updateForm(e)}
									/>
									 <label>Email:</label>
									<FormField
										id="email"
										formdata={this.state.formData.email}
										change={(e) => this.updateForm(e)}
									/>
									 <label>Phone Number:</label>
									<FormField
										id="phoneNumber"
										formdata={this.state.formData.phoneNumber}
										change={(e) => this.updateForm(e)}
									/>
									 <label>Faculties:</label>
									<FormField
										id="facultiesId"
										formdata={this.state.formData.facultiesId}
										change={(e) => this.updateForm(e)}
									/>
									<div className="row justify-content-around">
									
										<div className="col-4 text-right">
											<input
												type="button"
												className="btn btn-primary"
												onClick={e => this.submitForm(e)}
												defaultValue="Save"
											/>
											</div>
											<div className="col-4">
											<input type="button" className="btn btn-secondary" defaultValue="Cancel" />
											</div>
									</div>
								</form>
							</div>
						
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
    return {
        user: state.user.dataById,
    }
}
export default connect(mapStateToProps)(userProfile);
