import React, { Component } from "react";
import { connect } from "react-redux";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import { getTermData, deleteTerm, postTerm } from "../../actions/term_actions";
import ModalAddUpdate from "./modalAddUpdate";
import Pagination from "../utils/pagination";

class ManageTerm extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalTerm: "",
    disableAdd: false
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
    if (result) {
      this.props
        .dispatch(deleteTerm(term.id))
        .then(res => this.props.dispatch(getTermData()).then(res => this.handleBtnAdd()));
      
    }
  };

  handleSubmit = (termSubmit, termId) => {
    this.props
      .dispatch(postTerm(termSubmit, termId))
      .then(res => this.props.dispatch(getTermData()).then(res => this.handleBtnAdd()));
   
  };

  showUpdateForm(ter) {
    this.setState({
      modalShow: !this.state.modalShow,
      modalTerm: ter
    });
  }

  componentDidMount = async () => {
    await this.props.dispatch(getTermData());
    this.handleBtnAdd();
    this.setState({ term: this.props.term });
  };

  handleBtnAdd = () => {
    if (this.props.term.data.length !== 0) {
      var d1 = new Date();
      var d2 = new Date(
        this.props.term.data[this.props.term.data.length - 1].closingDate
      );
      var disableAdd = d2 < d1 ? false : true;
      this.setState({ disableAdd });
    } else {
      this.setState({ disableAdd: false });
    }
  };
  toggle = () => {
    this.setState({
      modalShow: !this.state.modalShow,
      modalTerm: ""
    });
  };

  getData = () => {
    const { pageSize, currentPage, searchQuery } = this.state;
    let filtered = this.props.term.data;
    if (searchQuery) {
      filtered = this.props.term.data.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    const dataPagination = paginate(filtered, currentPage, pageSize);
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
    const { pageSize, currentPage, modalTerm, modalShow } = this.state;
    const { data: dataPagination, itemsCount } = this.getData();
    return (
      <div style={{ marginLeft: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800 text-center">Manage Term</h1>
        <div className="row justify-content-end">
          <div className="col-6">
            <input
              placeholder="Search Contribution Title"
              type="text"
              className="form-control"
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-4">
            <button
              onClick={this.toggle}
              className="btn btn-info"
              disabled={this.state.disableAdd}
            >
              Add new Term
            </button>
            {this.state.disableAdd && <p style={{color:"red"}}>The current term is operating</p>}
          </div>
        </div>
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
