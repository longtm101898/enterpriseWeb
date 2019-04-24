import React, { Component } from 'react';
import FormField from '../utils/Form/formField';
import { getUserDataById, postUserProfile } from '../../actions/user_actions';
import { getCurrentUser } from '../../services/authService';
import { connect } from 'react-redux';
import {
	update,
	generateData,
	isFormValid,
	populateFields
} from "../utils/Form/formAction";
import Dropzone from "react-dropzone";

class userProfile extends Component {
	state = {
		formError: false,
		formSuccess: '',
		avatar: "",
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
	updateForm = (element) => {
		const newFormdata = update(element, this.state.formData, "user");
		this.setState({
			formError: false,
			formData: newFormdata
		});
	}
	handleSubmit = (userId, fullName, phoneNumber, avatar) => {
		this.props.dispatch(postUserProfile(userId, fullName, phoneNumber, avatar)).then(res => console.log(res));
	}
	submitForm = e => {
		e.preventDefault();
		let dataToSubmit = generateData(this.state.formData, "user");
		let formIsValid = isFormValid(this.state.formData, "user");
		if (formIsValid) {
			this.handleSubmit(this.state.userId, dataToSubmit.fullName, dataToSubmit.phoneNumber, this.state.avatar)
		} else {
			this.setState({
				formError: true
			});
		}

	};
	componentWillMount() {
		var user = getCurrentUser();
		this.setState({
			userId: user.Id
		})
	}
	componentDidMount = async () => {
		await this.props.dispatch(getUserDataById(this.state.userId));
		var userForm = populateFields(this.state.formData, this.props.user);
		this.setState({ formData: userForm, user: this.props.user, avatar: this.props.user.avatar });

	}
	render() {
		const styleLabel = { fontWeight: "bold" };
		const { avatar } = this.state;
		return (
			<div className="container text-left" style={{ marginLeft: '25px' }}>
				<div className="row m-y-2">
					<div className="col-lg-4 pull-lg-8 text-xs-center">
						<Dropzone onDrop={this.handleFile} accept="image/*" width="200px" height="200px">
							{({ getRootProps, getInputProps, acceptedFiles }) => (
								<section>
									<div
										{...getRootProps({ className: "dropzone" })}
									>
										<input {...getInputProps()} />
										<img src={"http://localhost:49763/" + avatar} className="m-x-auto img-fluid img-circle" alt="avatar" width="200px" height="200px"/>
									</div>
								</section>
							)}
						</Dropzone>
					</div>
					<div className="col-lg-8 push-lg-4">
						<div className="tab-pane" id="edit">
							<h4 className="m-y-2">Edit Profile</h4>
							<form>
								<label style={styleLabel}>Fullname:</label>
								<FormField
									id="fullName"
									formdata={this.state.formData.fullName}
									change={(e) => this.updateForm(e)}
								/>
								<label style={styleLabel}>Email:</label>
								<FormField
									id="email"
									formdata={this.state.formData.email}
									change={(e) => this.updateForm(e)}
								/>
								<label style={styleLabel}>Phone Number:</label>
								<FormField
									id="phoneNumber"
									formdata={this.state.formData.phoneNumber}
									change={(e) => this.updateForm(e)}
								/>
								<label style={styleLabel}>Faculties:</label>
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
