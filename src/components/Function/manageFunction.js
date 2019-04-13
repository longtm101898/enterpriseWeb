import React, { Component } from "react";
import { connect } from "react-redux";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import {getFunctionData} from "../../actions/function_actions";
import ModalAddUpdate from "./modalAddUpdate";

class ManageFunction extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalFunction: ""
  };

  columns = [
    {
      path: "name",
      label: "Name"
    },
    {
      path: "url",
      label: "URL"
    },
    {
      path: "parentId",
      label: "Parent ID"
    },
    {
      path: "iconCss",
      label: "Icon Css"
    },
    {
      path: "sortOrder",
      label: "Sort Order"
    },
    {
      path: "status",
      label: "Status"
    },
    {
      key: "update",
      content: fun => (
        <React.Fragment>
          <button
            onClick={() => this.showUpdateForm(fun)}
            className="btn btn-primary btn-sm"
          >
            <i className="fa fa-pen" />
          </button>
          <button
            onClick={() => this.handleDelete(fun)}
            className="btn btn-danger btn-sm"
          >
            <i className="fa fa-trash" />
          </button>
        </React.Fragment>
      )
    }
  ];

  handleDelete = fun => {
    alert(fun.id);
  };

  handleSubmit = (funSubmit, funId) => {
    console.log(funSubmit)
    console.log(funId)
  }

  showUpdateForm(fun) {
    this.setState({
      modalShow: !this.state.modalShow,
      modalFunction: fun
    });
  }

  componentDidMount = async () => {
    await this.props.dispatch(getFunctionData());
    console.log(this.props.function);
    this.setState({ function: this.props.function });
  };

  toggle = () => {
    this.setState({
      modalShow: !this.state.modalShow,
      modalFunction: ""
    });
  };

  getData = () => {
    const { pageSize, currentPage, searchQuery } = this.state;
    const dataPagination = paginate(
      this.props.function.data,
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
      modalFunction,
      modalShow
    } = this.state;
    const { data: dataPagination } = this.getData();
    return (
      <div style={{ marginLeft: "100px", marginRight: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800">Manage Function</h1>
        <button onClick={this.toggle}>Add new function</button>
        <ModalAddUpdate
          show={modalShow}
          toggle={this.toggle}
          functionInfo={modalFunction}
          onSubmit={this.handleSubmit}
        />
        
        <Table data={dataPagination} columns={this.columns} />
      </div>
    );
  }
}
  
const mapStateToProps = state => {
return { function: state.functions };
};
export default connect(mapStateToProps)(ManageFunction);
  