import React, { Component } from 'react';
import { connect } from "react-redux";
import { paginate } from '../utils/paginate';
import Pagination from '../utils/pagination';
import Table from "../utils/table/table";
import { getUserData,getUserDataById } from "../../actions/user_actions";
import ModalAddUpdate from './modalAddUpdate';
class ManageUser extends Component {
    state = {
        pageSize: 1,
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
                {/* <button
                    onClick={() => this.handleInfor()}>
                    
                </button> */}
                </React.Fragment>
            )
        }
    ];
    handleDelete = user => {
        alert(user.id);
    };
    handleSubmit = (userSubmit,userId) => {
        console.log(userSubmit)
        console.log(userId)
    }
    showUpdateForm(user){
        this.setState({
            modalShow: !this.state.modalShow,
            modalUser: user
        })
    }
    componentDidMount = async () => {
        await this.props.dispatch(getUserData());
        this.setState({user: this.props.user})
    }
    toggle = () => {
        this.setState({
            modalShow: !this.state.modalShow,
            modalUser: ""
        });
        
    };
    getData = () => {
        const {pageSize, currentPage, searchQuery} = this.state;
        const dataPagination = paginate(
            this.props.user.data,
            currentPage,
            pageSize
        )
        return {data: dataPagination};
    };

    handlePageChange = (page) =>{
        this.setState({
            currentPage: page
        })
    }

    render() {
        const {
            pageSize,
            currentPage,
            searchQuery,
            modalUser,
            modalShow,
          } = this.state;
          const itemsCount = this.props.user.data.length;
          const{data: dataPagination} = this.getData();
        return (
            <div style={{ marginLeft: "100px", marginRight: "50px" }}>
                <h1 className="h3 mb-2 text-gray-800">Manage User</h1>
                <button
                onClick = {this.toggle}
                >Add new User
                </button>
                <ModalAddUpdate
                show={modalShow}
                toggle={this.toggle}
                userInfo={modalUser}
                onSubmit={this.handleSubmit}
                />
                <Table data={dataPagination} columns={this.columns}/>
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
    return { user: state.user};
};

export default connect(mapStateToProps)(ManageUser);