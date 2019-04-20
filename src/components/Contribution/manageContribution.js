import React, { Component } from "react";
import { connect } from "react-redux";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import {
  getContributionData,
  deleteContribution,
  postContribution
} from "../../actions/contribution_actions";
import { getTermData } from "../../actions/term_actions";
import ModalAddUpdate from "./modalAddUpdate";
import Pagination from "../utils/pagination";
import { getCurrentUser } from "../../services/authService";

class ManageContribution extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalContribution: ""
  };

  columns = [
    {
      path: "title",
      label: "Title"
    },
    {
      path: "description",
      label: "Description"
    },
    {
      path: "periodEdited",
      label: "Period Edited"
    },
    // {
    //   path: "fileURL",
    //   label: "File URL"
    // },
    // {
    //   path: "imageURL",
    //   label: "Image URL"
    // },
    {
      path: "comment",
      label: "Comment"
    },
    {
      key: "update",
      content: con => (
        <React.Fragment>
          <button
            onClick={() => this.showUpdateForm(con)}
            className="btn btn-primary btn-sm"
          >
            <i className="fa fa-pen" />
          </button>
          <button
            onClick={() => this.handleDelete(con)}
            className="btn btn-danger btn-sm"
          >
            <i className="fa fa-trash" />
          </button>
        </React.Fragment>
      )
    }
  ];

  handleDisabled(con) {
    var d1 = new Date(con.periodEdited);
    var d2 = new Date();
    d1.setDate(d1.getDate() + 15);
    return d2 < d1 ? true : false;
  }

  handleDelete = con => {
    this.props
      .dispatch(deleteContribution(con.id))
      .then(
        this.props.dispatch(res =>
          getContributionData(this.state.user.Id, this.state.user.Roles)
        )
      );
  };

  handleSubmit = (conSubmit, conId, img, word, userId, termId) => {
    var termId = this.state.term.id;
    var userId = this.state.user.Id;
    this.props
      .dispatch(postContribution(conSubmit, conId, img, word, userId, termId))
      .then(res =>
        this.props.dispatch(
          getContributionData(this.state.user.Id, this.state.user.Roles)
        )
      );
  };

  showUpdateForm(con) {
    this.setState({
      modalShow: !this.state.modalShow,
      modalContribution: con
    });
  }

  componentWillMount = async () => {
    await this.props.dispatch(getTermData());
    this.setState({
      term: this.props.term.data[this.props.term.data.length - 1]
    });
    var d1 = new Date(this.state.term.closingDate);
    var d2 = new Date();
    d1.setDate(d1.getDate() - 15);
    this.setState({
      disbaledAdd: d2 > d1 ? true : false
    });
  };

  componentDidMount = async () => {
    var user = getCurrentUser();
    this.setState({
      user: user
    });
    await this.props.dispatch(getContributionData(user.Id, user.Roles));
    this.setState({ contribution: this.props.contribution });
  };

  toggle = () => {
    this.setState({
      modalShow: !this.state.modalShow,
      modalContribution: ""
    });
  };

  getData = () => {
    const { pageSize, currentPage, searchQuery } = this.state;

    let filtered = this.props.contribution.data;
    if (searchQuery) {
      filtered = this.props.contribution.data.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
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
    const {
      pageSize,
      currentPage,
      modalContribution,
      modalShow,
      disbaledAdd
    } = this.state;
    const { data: dataPagination, itemsCount: itemsCount } = this.getData();
    return (
      <div style={{ marginLeft: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800">Manage Contribution</h1>
        <div className="row justify-content-center">
          <div className="col-4">
            <input
              placeholder="Search....."
              type="text"
              className="form-control"
              onChange={this.handleSearch}
            />
          </div>
          <div className="col-4">
            <button
              onClick={this.toggle}
              disabled={disbaledAdd}
              className="btn btn-info"
            >
              Add new Contribution
            </button>
          </div>
        </div>
        <ModalAddUpdate
          show={modalShow}
          toggle={this.toggle}
          contributionInfo={modalContribution}
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
  return { contribution: state.contribution, term: state.term };
};
export default connect(mapStateToProps)(ManageContribution);
