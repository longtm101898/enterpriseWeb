import React, { Component } from "react";
import { connect } from "react-redux";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import {
  getContributionData,
  deleteContribution,
  postContribution,
  postCommentContribution
} from "../../actions/contribution_actions";
import { getTermData } from "../../actions/term_actions";
import ModalAddUpdate from "./modalAddUpdate";
import ModalComment from "./modalComment";
import Pagination from "../utils/pagination";
import { getCurrentUser } from "../../services/authService";

class ManageContribution extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalContribution: "",
    modalComment: false
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
          <button
            onClick={() => this.handleComment(con)}
            className="btn btn-danger btn-sm"
          >
            <i className="fa fa-comment" />
          </button>
        </React.Fragment>
      )
    }
  ];

  handleComment(con) {
    this.setState({
      modalComment: !this.state.modalComment,
      modalContribution: con
    })
  }

  handleDisabled(con) {
    var d1 = new Date(con.periodEdited);
    var d2 = new Date();
    d1.setDate(d1.getDate() + 15);
    return d2 < d1 ? true : false;
  }

  handleDelete = con => {
    var result = window.confirm("Do you want delete this contribution?");
    if (result) {
      this.props
        .dispatch(deleteContribution(con.id))
        .then(res =>
          this.props.dispatch(
            getContributionData(this.state.user.Id, this.state.user.Roles)
          )
        );
    }
  };

  handleSubmitComment = (conId, comment, status) => {
    this.props.dispatch(postCommentContribution(conId, comment, status))
      .then(res =>
        this.props.dispatch(
          getContributionData(this.state.user.Id, this.state.user.Roles)
        ));
  }

  handleSubmit = (conSubmit, conId, img, word, userId) => {
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
      disbaledAdd: d2 < d1 ? true : false
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
    if(this.state.disbaledAdd === false && this.state.modalContribution === ""){
      this.setState({
        modalShow: false,
        modalContribution: ""
      });
    }
    else{
      this.setState({
        modalShow: !this.state.modalShow,
        modalContribution: ""
      });
    }
   
  };

  toggleComment = () => {
    this.setState({
      modalComment: !this.state.modalComment,
      modalContribution: ""
    })
  }

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
      disbaledAdd,
      modalComment
    } = this.state;
    const { data: dataPagination, itemsCount } = this.getData();
    return (
      <div style={{ marginLeft: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800 text-center">Manage Contribution</h1>
        <div className="row justify-content-end">
          <div className="col-6">
            <input
              placeholder="Search Contribution Title"
              type="text"
              className="form-control"
              onChange={this.handleSearch}
            /></div>
          <div className="col-4">
            <button
              onClick={this.toggle}
              data-toggle="collapse"
              href="#collapseExample"
              className="btn btn-info"
            >
              Add new Contribution
            </button>
            {disbaledAdd === false ? <div className='collapse' id='collapseExample'> <div className='card card-body'>The Term is out of date</div></div>
              : ""}
           
          </div>
        </div>
        <ModalComment
          show={modalComment}
          toggle={this.toggleComment}
          contributionInfo={modalContribution}
          onSubmit={this.handleSubmitComment}
        />
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
