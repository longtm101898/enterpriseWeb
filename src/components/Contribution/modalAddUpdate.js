import React, { Component, useCallback } from 'react';
import FormField from '../utils/Form/formField';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { update, generateData, isFormValid, resetFields, populateFields } from '../utils/Form/formAction';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import ewApi from '../../axios-ew';

class ModelAddUpdate extends Component {
	state = {
		formError: false,
		formSuccess: '',
		formData: {
			title: {
				element: 'input',
				value: '',
				config: {
					className: 'form-control',
					name: 'title_input',
					type: 'text',
					placeholder: 'Enter Contribution Title'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			},
			description: {
				element: 'input',
				value: '',
				config: {
					className: 'form-control',
					name: 'description_input',
					type: 'text',
					placeholder: 'Enter Contribution Description'
				},
				validation: {
					required: true
				},
				valid: false,
				touched: false,
				validationMessage: ''
			}
		},
		disableButton: true
	};
	componentWillReceiveProps(nextProps) {
		if (nextProps.contributionInfo !== '') {
			var conForm = populateFields(this.state.formData, nextProps.contributionInfo);
			this.setState({ formData: conForm, conId: nextProps.contributionInfo.id });
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

	updateForm = (element) => {
		const newFormdata = update(element, this.state.formData, 'con');
		this.setState({
			formError: false,
			formData: newFormdata
		});
	};

	submitForm = (e) => {
		e.preventDefault();
		let dataToSubmit = generateData(this.state.formData, 'con');
		let formIsValid = isFormValid(this.state.formData, 'con');
		if (formIsValid) {
			if (this.state.conId !== 0) {
				console.log('update');
				this.props.onSubmit(dataToSubmit, this.state.conId);
			} else {
				this.props.onSubmit(dataToSubmit);
			}
			// this.props.onSubmitForm(dataToSubmit);
			this.props.toggle();
		} else {
			this.setState({
				formError: true
			});
		}
	};

	handleFile = (acceptedFiles) => {
		if (acceptedFiles.length != 0) {
			console.log(acceptedFiles[0]);
			let formData = new FormData();
			formData.append('files', acceptedFiles[0], acceptedFiles[0].name);
			// var fileData = File(acceptedFiles[0])
			ewApi.post('upload', formData).then((res) => console.log(res));
		} else {
			alert('The file is invalid !!!');
		}
	};

	handleChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({
			disableButton: !value
		});
	};

	render() {
		const dropzoneStyled = {
			border: '2px dashed #0087F7',
			borderRadius: '5px',
			background: '#ebd5d5',
			cursor: 'pointer',
			padding: '54px 54px'
		};
		const { disableButton } = this.state;

		return (
			<div style={{ margin: '0 auto' }}>
				<Modal isOpen={this.props.show} toggle={this.props.toggle}>
					<ModalHeader>Student Submit & Update Form</ModalHeader>
					<ModalBody>
						<form onSubmit={(e) => this.submitForm(e)}>
							<FormField
								id="title"
								formdata={this.state.formData.title}
								change={(e) => this.updateForm(e)}
							/>
							<FormField
								id="description"
								formdata={this.state.formData.description}
								change={(e) => this.updateForm(e)}
							/>
							<label>Word file: </label>
							<Dropzone onDrop={this.handleFile} accept=".doc,.docx">
								{({ getRootProps, getInputProps, acceptedFiles }) => (
									<section>
										<div {...getRootProps()} style={dropzoneStyled}>
											<input {...getInputProps()} />
											<p>
												{acceptedFiles.length !== 0 ? (
													''
												) : (
													"Drag 'n' drop some files here, or click to select files"
												)}
											</p>
											<ul>
												{acceptedFiles &&
													acceptedFiles.map((file) => <li key={file.path}><i className="far fa-file-word"></i> {file.path}</li>)}
											</ul>
										</div>
									</section>
								)}
							</Dropzone>
							<label>Image File: </label>
							<Dropzone onDrop={this.handleFile} accept="image/*">
								{({ getRootProps, getInputProps, acceptedFiles }) => (
									<section>
										<div {...getRootProps()} style={dropzoneStyled}>
											<input {...getInputProps()} />
											<p>
												{acceptedFiles.length !== 0 ? (
													''
												) : (
													"Drag 'n' drop some files here, or click to select files"
												)}
											</p>
											<ul>
												{acceptedFiles &&
													acceptedFiles.map((file) => <li key={file.path}><i className="far fa-file-image"></i> {file.path}</li>)}
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
							</div>
						</form>
					</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={(e) => this.submitForm(e)} disabled={disableButton}>
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
const mapStateToProps = (state) => {
	return { term: state.term };
};
export default connect(mapStateToProps, null)(ModelAddUpdate);
