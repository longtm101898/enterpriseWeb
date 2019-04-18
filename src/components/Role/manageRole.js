import React, { Component } from "react";
import Table from "../utils/table/table";
import { paginate } from "../utils/paginate";
import { connect } from "react-redux";
import { getRoleData } from "../../actions/role_actions";
import ModalAddUpdate from "./modalAddUpdate";
import { getCurrentUser, hasPermission } from "../../services/authService";

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
    alert(role.id);
  };

  handleSubmit = (role, roleId) => {
    console.log(role)
    console.log(roleId)
  }

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
    const dataPagination = paginate(
      this.props.roles.data,
      currentPage,
      pageSize
    );
    return { data: dataPagination };
  };
  render() {
    const {
      pageSize,
      currentPage,
      searchQuery,
      modalRole,
      modalShow
    } = this.state;
    const { data: dataPagination } = this.getData();
    return (
      <div style={{ marginLeft: "100px", marginRight: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800">Manage Roles</h1>
        <button onClick={this.toggle}>Add new role</button>
        <ModalAddUpdate
          show={modalShow}
          toggle={this.toggle}
          roleInfo={modalRole}
          onSubmit={this.handleSubmit}
        />
        <Table data={dataPagination} columns={this.columns} />
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
