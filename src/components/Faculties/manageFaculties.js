import React, { Component } from "react";
import { connect } from "react-redux";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import { getFacultiesData } from "../../actions/faculties_actions";
import ModalAddUpdate from "./modalAddUpdate";

class ManageFaculties extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalFaculties: ""
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
        </React.Fragment>
      )
    }
  ];
  handleDelete = fac => {
    alert(fac.id);
  };

  handleSubmit = (facSubmit, facId) => {
    console.log(facSubmit)
    console.log(facId)
  }

  showUpdateForm(fac) {
    this.setState({
      modalShow: !this.state.modalShow,
      modalFaculties: fac
    });
  }

  componentDidMount = async () => {
    await this.props.dispatch(getFacultiesData());
    this.setState({ faculties: this.props.faculties });
  };

  toggle = () => {
    this.setState({
      modalShow: !this.state.modalShow,
      modalFaculties: ""
    });
  };

  getData = () => {
    const { pageSize, currentPage, searchQuery } = this.state;
    const dataPagination = paginate(
      this.props.faculties.data,
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
      modalFaculties,
      modalShow
    } = this.state;
    const { data: dataPagination } = this.getData();
    return (
      <div style={{ marginLeft: "100px", marginRight: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800">Manage Faculties</h1>
        <button onClick={this.toggle}>Add new faculties</button>
        <ModalAddUpdate
          show={modalShow}
          toggle={this.toggle}
          facultiesInfo={modalFaculties}
          onSubmit={this.handleSubmit}
        />
        <Table data={dataPagination} columns={this.columns} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { faculties: state.faculties };
};
export default connect(mapStateToProps)(ManageFaculties);
