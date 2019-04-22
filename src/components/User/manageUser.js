import React, { Component } from 'react';
import { connect } from "react-redux";
import { paginate } from '../utils/paginate';
import Pagination from '../utils/pagination';
import Table from "../utils/table/table";
import { getUserData, getUserDataById, postUser, deleteUser } from "../../actions/user_actions";
import ModalAddUpdate from './modalAddUpdate';
class ManageUser extends Component {
    state = {
        pageSize: 4,
        currentPage: 1,
        searchQuery: "",
        modalShow: false,
        modalUser: ""
    };
    columns = [
        {
            path: "fullName",
            label: "FullName"
        },
        {
            path: "email",
            label: "Email"
        },
        {
            path: "phoneNumber",
            label: "Phone Number"
        },
        {
            path: "status",
            label: "Status"
        },
        {
            key: "update",
            content: fac => (
                <React.Fragment>
                    <button
                        onClick={() => this.showUpdateForm(fac)}
                        className="btn btn-primary btn-sm"
                    >
                        <i className="fa fa-pen" />
                    </button>
                    <button
                        onClick={() => this.handleDelete(fac)}
                        className="btn btn-danger btn-sm"
                    >
                        <i className="fa fa-trash" />
                    </button>
                    <button
                        onClick={() => this.handleInfor(fac)}
                        className="btn btn-info btn-sm">
                        <i className="fa fa-info" />
                    </button>
                </React.Fragment>
            )
        }
    ];
    handleDelete = user => {
        var result = window.confirm("Do you want delete this user?");
        if(result){
            this.props.dispatch(deleteUser(user.id)).then(res => this.props.dispatch(getUserData()));
        }  
    };
    handleSubmit = (userSubmit, userId) => {
        this.props.dispatch(postUser(userSubmit, userId)).then(res => this.props.dispatch(getUserData()));
    }
    async showUpdateForm(user) {
        await this.props.dispatch(getUserDataById(user.id));
        console.log(this.props.user)
        this.setState({
            modalShow: !this.state.modalShow,
            modalUser: this.props.user,
        });
    }

    async handleInfor(user) {
        await this.props.dispatch(getUserDataById(user.id));
        this.setState({
            modalShow: !this.state.modalShow,
            modalUser: this.props.user,
        });
    }
    componentDidMount = async () => {
        await this.props.dispatch(getUserData());
        this.setState({ user: this.props.users })
    }
    toggle = () => {
        this.setState({
            modalShow: !this.state.modalShow,
            modalUser: ""
        });

    };
    getData = () => {
        const { pageSize, currentPage, searchQuery } = this.state;
        let filtered = this.props.users.data;
        if (searchQuery) {
            filtered = this.props.users.data.filter(m =>
                m.fullName.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        }
        const dataPagination = paginate(
            filtered,
            currentPage,
            pageSize
        )
        return { data: dataPagination, itemsCount: filtered.length };
    };

    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        })
    };

    handleSearch = event => {
        const element = event.target.value;
        this.setState({
            searchQuery: element
        });
    };
    render() {
        const {
            pageSize,
            currentPage,
            modalUser,
            modalShow,
        } = this.state;
        const { data: dataPagination, itemsCount } = this.getData();
        return (
            <div style={{ marginLeft: "50px" }}>
                <h1 className="h3 mb-2 text-gray-800 text-center">Manage User</h1>
                <div className="row justify-content-end">
                    <div className="col-6">
                        <input
                            placeholder="Search User Name"
                            type="text"
                            className="form-control"
                            onChange={this.handleSearch}
                        /></div>
                    <div className="col-4">
                        <button
                            onClick={this.toggle}
                            className="btn btn-info">
                            Add new User
                         </button>
                    </div>
                </div>
                <ModalAddUpdate
                    show={modalShow}
                    toggle={this.toggle}
                    userInfo={modalUser}
                    onSubmit={this.handleSubmit}
                />
                <Table data={dataPagination} columns={this.columns} />
                <Pagination
                    itemsCount={itemsCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { users: state.user, user: state.user.dataById };
};

export default connect(mapStateToProps)(ManageUser);