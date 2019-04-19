import React, { Component } from "react";
import { connect } from "react-redux";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import { getTermData,deleteTerm,postTerm } from "../../actions/term_actions";
import ModalAddUpdate from "./modalAddUpdate";
import Pagination from "../utils/pagination";

class ManageTerm extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalTerm: ""
  };

  columns = [
    {
      path: "name",
      label: "Name"
    },
    {
      path: "dateStarted",
      label: "Date Started"
    },
    {
      path: "closingDate",
      label: "Closing Date"
    },
    {
      key: "update",
      content: term => (
        <React.Fragment>
          <button
            onClick={() => this.showUpdateForm(term)}
            className="btn btn-primary btn-sm"
          >
            <i className="fa fa-pen" />
          </button>
          <button
            onClick={() => this.handleDelete(term)}
            className="btn btn-danger btn-sm"
          >
            <i className="fa fa-trash" />
          </button>
        </React.Fragment>
      )
    }
  ];
  handleDelete = term => {
    var result = window.confirm("Do you want delete this term?");
    if(result){
      this.props.dispatch(deleteTerm(term.id)).then(res => this.props.dispatch(getTermData()));
    }
    
  };

  handleSubmit = (termSubmit, termId) => {
    this.props.dispatch(postTerm(termSubmit,termId)).then(res => this.props.dispatch(getTermData()));
  }

  showUpdateForm(ter) {
    this.setState({
      modalShow: !this.state.modalShow,
      modalTerm: ter
    });
  }

  componentDidMount = async () => {
    await this.props.dispatch(getTermData());
    this.setState({ term: this.props.term });
  };

  toggle = () => {
    this.setState({
      modalShow: !this.state.modalShow,
      modalTerm: ""
    });
  };

  getData = () => {
    const { pageSize, currentPage, searchQuery } = this.state;
    const dataPagination = paginate(
      this.props.term.data,
      currentPage,
      pageSize
    );
    console.log(this.state);
    return { data: dataPagination};
  };
  
  handlePageChange = page =>{
    this.setState({
      currentPage: page
    })
  }

  render() {
    const {
      pageSize,
      currentPage,
      searchQuery,
      modalTerm,
      modalShow
    } = this.state;  
    const itemsCount = this.props.term.data.length;
    const { data: dataPagination } = this.getData();
    return (
      <div style={{ marginLeft: "100px", marginRight: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800">Manage Term</h1>
        <button onClick={this.toggle}>Add new Term</button>
        <ModalAddUpdate
          show={modalShow}
          toggle={this.toggle}
          termInfo={modalTerm}
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
  return { term: state.term };
};
export default connect(mapStateToProps)(ManageTerm);
