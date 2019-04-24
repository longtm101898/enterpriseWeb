import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { getRoleData } from "../../actions/role_actions";
import { getFacultiesData } from "../../actions/faculties_actions";
import {
    resetFields,
} from "../utils/Form/formAction";
class modalInfoUser extends Component {
    state = {
        modal: false,
        formError: false,
        formSuccess: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        avatar: "",
        faculties: "",
        role: "",
        status: ""

    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.userInfo !== "") {
            for (var i = 0; i < this.props.faculties.data.length; i++) {
                if (this.props.faculties.data[i].id === nextProps.userInfo.facultiesId) {
                    this.setState({
                        faculties: this.props.faculties.data[i].name
                    })
                }
            }
            const { fullName, email, phoneNumber, avatar, status } = nextProps.userInfo;
            this.setState({ status: status === 0 ? "InActive" : "Active" });

            this.setState({ fullName, email, phoneNumber, avatar })
            this.setState({ role: nextProps.userInfo.roles[0] });
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

    }
    render() {
        const styleLabel = { fontWeight: "bold" };
        const { fullName, email, phoneNumber, avatar, faculties, role, status} = this.state;
        return (
            <div>
                <Modal isOpen={this.props.show} toggle={this.props.toggle}>
                    <ModalHeader>User Information</ModalHeader>
                    <ModalBody>
                        <form onSubmit={e => this.submitForm(e)}>
                            <label style={styleLabel}>Full name:</label>
                            <p>{fullName}</p>
                            <label style={styleLabel}>Email:</label>
                            <p>{email}</p>
                            <label style={styleLabel}>Phone Number:</label>
                            <p>{phoneNumber}</p>
                            <label style={styleLabel}>Avatar:</label>
                            <img
                                width="50%"
                                height="50%"
                                src={"http://localhost:49763/" + avatar}
                                alt={avatar}
                            />
                            <br />
                            <label style={styleLabel}>Status:</label>
                            <p>{status}</p>
                            <label style={styleLabel}>Role:</label>
                            <p>{role}</p>
                            <label style={styleLabel}>Faculties:</label>
                            <p>{faculties}</p>
                        </form>
                    </ModalBody>
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
export default connect(mapStateToProps)(modalInfoUser);