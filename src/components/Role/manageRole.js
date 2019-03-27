import React, { Component } from "react";
import Table from "../utils/table/table";
import { paginate } from "../utils/paginate";
import { connect } from "react-redux";
import { getRoleData } from "../../actions/role_actions";

class ManageRole extends Component {
  state = {
    roles: [
      {
        id: "5b21ca3eeb7f6fbccd471816",
        name: "Admin",
        description: "ADMIN"
      }
    ],
    pageSize: 4,
    currentPage: 1,
    searchQuery: ""
  };

  columns = [
    {
      path: "name",
      label: "Name"
    },
    {
      path: "description",
      label: "Description"
    }
  ];

  componentDidMount = async () => {
    await this.props.dispatch(getRoleData());
    this.setState({ roles: this.props.roles });
  };

  getData = () => {
    const { pageSize, currentPage, searchQuery } = this.state;
    const dataPagination = paginate(this.props.roles.data, currentPage, pageSize);
    return { data: dataPagination };
  };
  render() {
    const { pageSize, currentPage, searchQuery } = this.state;
    const { data: dataPagination } = this.getData();
    if (this.props.roles === null) {
      return <h1>Loading...</h1>;
    }
    return (
      <div style={{ marginLeft: "100px", marginRight: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800">Manage Roles</h1>

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
