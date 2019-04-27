import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import Pagination from "../utils/pagination";
import Table from "../utils/table/table";
import {
  getUserData,
  getUserDataById,
  postUser,
  deleteUser
} from "../../actions/user_actions";
import ModalAddUpdate from "./modalAddUpdate";
import ModalUpdateUser from "./modalUpdateUser";
import ModalInfoUser from "./modalInfoUser";
import ModalExcelImport from "./modalExcelImport";
import { toast } from "react-toastify";
class ManageUser extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalUser: "",
    modalShowInfo: false,
    modalShowImport: false,
    modalUpdate: false,
    sortColumn: { path: "fullName", order: "asc" }
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
            className="btn btn-info btn-sm"
          >
            <i className="fa fa-info" />
          </button>
        </React.Fragment>
      )
    }
  ];
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleDelete = user => {
    var result = window.confirm("Do you want delete this user?");
    if (result) {
      this.props
        .dispatch(deleteUser(user.id))
        .then(res => this.props.dispatch(getUserData()));
      toast.success("Delete user successfully!!!");
    }
  };
  handleSubmit = (userSubmit, userId) => {
    this.props
      .dispatch(postUser(userSubmit, userId))
      .then(res => this.props.dispatch(getUserData()));
  };
  async showUpdateForm(user) {
    await this.props.dispatch(getUserDataById(user.id));
    this.setState({
      modalUpdate: !this.state.modalUpdate,
      modalUser: this.props.user
    });
  }

  async handleInfor(user) {
    await this.props.dispatch(getUserDataById(user.id));
    this.setState({
      modalShowInfo: !this.state.modalShowInfo,
      modalUser: this.props.user
    });
  }
  componentDidMount = async () => {
    await this.props.dispatch(getUserData());
    this.setState({ user: this.props.users });
  };

  toggleUpdate = () =>{
    this.setState({
      modalUpdate: !this.state.modalUpdate,
      modalUser: ""
    })
  }

  toggle = () => {
    this.setState({
      modalShow: !this.state.modalShow,
      modalUser: ""
    });
  };
  toggleImport = () => {
    this.setState({
      modalShowImport: !this.state.modalShowImport
    });
  };
  toggleInfo = () => {
    this.setState({
      modalShowInfo: !this.state.modalShowInfo,
      modalUser: ""
    });
  };
  getData = () => {
    const { pageSize, currentPage, searchQuery,sortColumn } = this.state;
    let filtered = this.props.users.data;
    if (searchQuery) {
      filtered = this.props.users.data.filter(m =>
        m.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const dataPagination = paginate(sorted, currentPage, pageSize);
    dataPagination.filter(user => {
      if (user.status == 1)
        user.status = <span className="text-success">Active</span>;
      else if (user.status == 0)
        user.status = <span className="text-danger">Blocked</span>;
    });
    return { data: dataPagination, itemsCount: filtered.length };
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };

  handleSearch = event => {
    const element = event.target.value;
    this.setState({
      searchQuery: element
    });
  };
  onSubmitExcel = () => {
    this.props.dispatch(getUserData())
  }
  render() {
    const {
      pageSize,
      currentPage,
      modalUser,
      modalShow,
      modalShowInfo,
      modalShowImport,
      sortColumn,
      modalUpdate
    } = this.state;
    const { data: dataPagination, itemsCount } = this.getData();
    return (
      <div style={{ marginLeft: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800 text-center">Manage User</h1>
        <div className="row justify-content-end">
          <div className="col-lg-6 col-sm-12 col-xs-12">
            <input
              placeholder="Search User Name"
              type="text"
              className="form-control"
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-lg-4 col-sm-12 col-xs-12">
            <button onClick={this.toggleImport} className="btn btn-success">
              Import excel
            </button>
            <button onClick={this.toggle} className="btn btn-info">
              Add new User
            </button>
          </div>
        </div>
        <ModalInfoUser
          show={modalShowInfo}
          toggle={this.toggleInfo}
          userInfo={modalUser}
        />
        <ModalUpdateUser
          show={modalUpdate}
          toggle={this.toggleUpdate}
          userInfo={modalUser}
          onSubmit={this.handleSubmit}
          roles={this.props.role.data}
          faculties={this.props.faculties.data}
        />
        <ModalAddUpdate
          show={modalShow}
          toggle={this.toggle}
          userInfo={modalUser}
          onSubmit={this.handleSubmit}
        />
        <ModalExcelImport
          show={modalShowImport}
          toggle={this.toggleImport}
          role={this.props.role.data}
          faculties={this.props.faculties.data}
          onSubmit={this.onSubmitExcel}
        />
        <Table data={dataPagination} columns={this.columns}  sortColumn={sortColumn}
          onSort={this.handleSort}/>
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
  return {
    users: state.user,
    user: state.user.dataById,
    role: state.role,
    faculties: state.faculties
  };
};

export default connect(mapStateToProps)(ManageUser);
