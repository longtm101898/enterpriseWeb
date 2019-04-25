import React, { Component } from "react";
import Table from "../utils/table/table";
import { paginate } from "../utils/paginate";
import { connect } from "react-redux";
import {
  getRoleData,
  postData,
  putData,
  deleteData
} from "../../actions/role_actions";
import ModalAddUpdate from "./modalAddUpdate";
import { hasPermission } from "../../services/authService";
import Pagination from "../utils/pagination";
import { toast } from "react-toastify";

class ManageRole extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalRole: ""
  };

  columns = [
    {
      path: "name",
      label: "Name"
    },
    {
      path: "description",
      label: "Description"
    },
    {
      key: "update",
      content: role => (
        <React.Fragment>
          {hasPermission("SYSTEM.ROLE_UPDATE", "update") && (
            <button
              onClick={() => this.showUpdateForm(role)}
              className="btn btn-primary btn-sm"
            >
              <i className="fa fa-pen" />
            </button>
          )}
          {hasPermission("SYSTEM.ROLE_DELETE", "delete") && (
            <button
              onClick={() => this.handleDelete(role)}
              className="btn btn-danger btn-sm"
            >
              <i className="fa fa-trash" />
            </button>
          )}
        </React.Fragment>
      )
    }
  ];
  handleDelete = role => {
    var result = window.confirm("Do you want delete this role?");
    if (result) {
      this.props
        .dispatch(deleteData(role.id))
        .then(res => this.props.dispatch(getRoleData()));
    }
  };

  handleSubmit = (role, roleId) => {
    if (roleId === "") {
      this.props
        .dispatch(postData(role))
        .then(res => this.props.dispatch(getRoleData()));
      toast.success("Add role successfully!!!");
    } else {
      this.props
        .dispatch(putData(role, roleId))
        .then(res => this.props.dispatch(getRoleData()));
      toast.success("Update role successfully!!!");
    }
  };

  showUpdateForm(role) {
    this.setState({
      modalShow: !this.state.modalShow,
      modalRole: role
    });
  }

  componentDidMount = async () => {
    await this.props.dispatch(getRoleData());
    this.setState({ roles: this.props.roles });
  };

  toggle = () => {
    this.setState({
      modalShow: !this.state.modalShow,
      modalRole: ""
    });
  };
  getData = () => {
    const { pageSize, currentPage, searchQuery } = this.state;
    let filtered = this.props.roles.data;
    if (searchQuery) {
      filtered = this.props.roles.data.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const dataPagination = paginate(filtered, currentPage, pageSize);
    return { data: dataPagination, itemsCount: filtered.length };
  };
  handleSearch = event => {
    const element = event.target.value;
    this.setState({
      searchQuery: element
    });
  };

  handlePageChange = page => {
    this.setState({
      currentPage: page
    });
  };
  render() {
    const { pageSize, currentPage, modalRole, modalShow } = this.state;
    const { data: dataPagination, itemsCount } = this.getData();
    return (
      <div style={{ marginLeft: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800 text-center">Manage Role</h1>
        <div className="row justify-content-end">
          <div className="col-6">
            <input
              placeholder="Search Role Name"
              type="text"
              className="form-control"
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-4">
            <button onClick={this.toggle} className="btn btn-info">
              Add new Role
            </button>
          </div>
        </div>
        <ModalAddUpdate
          show={modalShow}
          toggle={this.toggle}
          roleInfo={modalRole}
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
  return {
    roles: state.role
  };
};

export default connect(mapStateToProps)(ManageRole);
