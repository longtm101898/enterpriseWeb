import React, { Component } from "react";
import { connect } from "react-redux";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import { getFacultiesData, deleteFaculties, postFaculties } from "../../actions/faculties_actions";
import ModalAddUpdate from "./modalAddUpdate";
import Pagination from "../utils/pagination";

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
    var result = window.confirm("Do you want delete this faculties?");
    if(result){
      this.props.dispatch(deleteFaculties(fac.id)).then(res => this.props.dispatch(getFacultiesData()));
    }  
  };

  handleSubmit = (facSubmit, facId) => {
    this.props.dispatch(postFaculties(facSubmit,facId)).then(res => this.props.dispatch(getFacultiesData()));
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
    let filtered = this.props.faculties.data;
    if (searchQuery) {
      filtered = this.props.faculties.data.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const dataPagination = paginate(
      filtered,
      currentPage,
      pageSize
    );
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

  render() {
    const {
      pageSize,
      currentPage,
      modalFaculties,
      modalShow
    } = this.state;
    const { data: dataPagination, itemsCount: itemsCount  } = this.getData();
    return (
      <div style={{ marginLeft: "50px" }}>
         <h1 className="h3 mb-2 text-gray-800 text-center">Manage Faculties</h1>
        <div className="row justify-content-end">
          <div className="col-6">
            <input
              placeholder="Search Faculties Name"
              type="text"
              className="form-control"
              onChange={this.handleSearch}
            /></div>
          <div className="col-4">
            <button
              onClick={this.toggle}
              className="btn btn-info"
            >
              Add new Faculties
            </button>
          </div>
        </div>
        <ModalAddUpdate
          show={modalShow}
          toggle={this.toggle}
          facultiesInfo={modalFaculties}
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
  return { faculties: state.faculties };
};
export default connect(mapStateToProps)(ManageFaculties);
