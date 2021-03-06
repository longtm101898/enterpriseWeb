import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import {
  getContributionData,
  deleteContribution,
  postContribution,
  postCommentContribution,
  getContributionById
} from "../../actions/contribution_actions";
import { getCurrentTerm, getOutdatedTerm } from "../../actions/term_actions";
import ModalAddUpdate from "./modalAddUpdate";
import ModalComment from "./modalComment";
import Pagination from "../utils/pagination";
import { getCurrentUser, hasPermission } from "../../services/authService";
import ModalDownload from "./modalDownload";
import ModalInfo from "./modalInfo";
import ewApi from "../../axios-ew";

class ManageContribution extends Component {
  state = {
    pageSize: 4,
    currentPage: 1,
    searchQuery: "",
    modalShow: false,
    modalContribution: "",
    modalComment: false,
    modalDownloadShow: false,
    modalDownloadData: "",
    modalInfo: false,
    sortColumn: { path: "title", order: "asc" }
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
      path: "comment",
      label: "Comment"
    },
    {
      path: "termName",
      label: "Term Name"
    },
    {
      path: "status",
      label: "status"
    },
    {
      key: "update",
      content: con => (
        <React.Fragment>
          {hasPermission("CONTRIBUTION.VIEW_UPDATE", "update") && (
            <button
              onClick={() => this.showUpdateForm(con)}
              className="btn btn-primary btn-sm"
              disabled={this.handleDisabled(con)}
            >
              <i className="fa fa-pen" />
            </button>
          )}
          {hasPermission("CONTRIBUTION.VIEW_DELETE", "delete") && (
            <button
              onClick={() => this.handleDelete(con)}
              className="btn btn-danger btn-sm"
              disabled={this.handleDisDelete(con)}
            >
              <i className="fa fa-trash" />
            </button>
          )}
          {hasPermission("CONTRIBUTION.VIEW_COMMENT", "update") && (
            <button
              onClick={() => this.handleComment(con)}
              className="btn btn-secondary btn-sm"
              disabled={this.handleDisComment(con)}
            >
              <i className="fa fa-comment" />
            </button>
          )}
          <button
            onClick={() => this.handleInfo(con)}
            className="btn btn-info btn-sm">
            <i className="fa fa-info" />
          </button>
        </React.Fragment>
      )
    }
  ];

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleDisDelete(con) {
    if ((con.comment !== null || con.status === "Published") && con.status !== "Cancelled") {
      return true;
    }
    else return false;
  }

  handleDisComment(con) {
    var d1 = new Date(con.dateCreated);
    var d2 = new Date();
    d1.setDate(d1.getDate() + 14);
    return d2 > d1 ? true : false;
  }

  handleInfo = async (con) =>{
    await this.props.dispatch(getContributionById(con.id));
    this.setState({
      modalInfo: !this.state.modalInfo,
      modalContribution: this.props.contribution.dataById
    })
  }

  handleDownload = async () => {
    await this.props.dispatch(getOutdatedTerm());
    this.setState({
      modalDownloadShow: !this.state.modalDownloadShow,
      modalDownloadData: this.props.term.outDatedTerm
    });
  };
  async handleComment(con) {
    await this.props.dispatch(getContributionById(con.id));
    this.setState({
      modalComment: !this.state.modalComment,
      modalContribution: this.props.contribution.dataById
    });
  }

  handleDisabled(term) {
    var d1 = new Date(term.closingDate);
    var d2 = new Date();
    if (d2 > d1 || term.status === "Published") return true
    else return false
  }

  handleDelete = con => {
    var result = window.confirm("Do you want delete this contribution?");
    if (result) {
      this.props
        .dispatch(deleteContribution(con.id))
        .then(res => {
          this.props.dispatch(
            getContributionData(this.state.user.Id, this.state.user.Roles)
          );
          toast.success("Delete contribution successfully!!!")
        });
      this.setState({
        currentPage: 1
      })
    }
  };

  handleSubmitComment = (conId, comment, status) => {
    if (comment === null) {
      comment = ""
    }
    this.props
      .dispatch(postCommentContribution(conId, comment, status))
      .then(res => {
        this.props.dispatch(
          getContributionData(this.state.user.Id, this.state.user.Roles)
        );
        toast.success("Add comment Successfully!!!");
      });
  };

  handleSubmit = (conSubmit, conId, img, word) => {
    var termId = this.state.term.id;
    var userId = this.state.user.Id;
    if(conId === 0){
      setTimeout(async function(){
        var user = getCurrentUser();
        await ewApi.post(`contribution/sendemail?facultiesId=${user.facultiesId}`, {fullName: user.fullName, email: user.Email});
      }, 800)
    }
     
    this.props
      .dispatch(postContribution(conSubmit, conId, img, word, userId, termId))
      .then(res => {
        this.props.dispatch(
          getContributionData(this.state.user.Id, this.state.user.Roles)
        );
        conId !== 0 ? toast.success("Update contribution successfully!!!") : toast.success("Add contribution successfully!!!")
      });
  };

  async showUpdateForm(con) {
    await this.props.dispatch(getContributionById(con.id));
    this.setState({
      modalShow: !this.state.modalShow,
      modalContribution: this.props.contribution.dataById
    });
  }

  componentWillMount = async () => {
    await this.props.dispatch(getCurrentTerm());

    if (this.props.term.curterm !== "") {
      this.setState({
        term: this.props.term.curterm,
        terms: this.props.term.data
      });
      var d1 = new Date(this.state.term.closingDate);
      var d2 = new Date();
      d1.setDate(d1.getDate() - 15);
      this.setState({
        disbaledAdd: d2 < d1 ? true : false
      });
    } else {
      window.alert("You can't submit contribution now!!");
      this.setState({
        disbaledAdd: false
      });
    }
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
    if (
      this.state.disbaledAdd === false &&
      this.state.modalContribution === ""
    ) {
      this.setState({
        modalShow: false,
        modalContribution: ""
      });
    } else {
      this.setState({
        modalShow: !this.state.modalShow,
        modalContribution: ""
      });
    }
  };

  toggleInfo = () =>{
    this.setState({modalInfo: !this.state.modalInfo})
  }

  toggleDownload = () => {
    this.setState({ modalDownloadShow: !this.state.modalDownloadShow });
  };
  toggleComment = () => {
    this.setState({
      modalComment: !this.state.modalComment,
      modalContribution: ""
    });
  };

  getData = () => {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    let filtered = this.props.contribution.data;
    if (searchQuery) {
      filtered = this.props.contribution.data.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const dataPagination = paginate(sorted, currentPage, pageSize);
    dataPagination.filter(contribution => {
      if (contribution.status == 0) contribution.status = "Waiting"
      else if (contribution.status == 1) contribution.status = "Cancelled"
      else if (contribution.status == 2) contribution.status = "Published"
    })
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
      modalDownloadShow,
      modalDownloadData,
      modalShow,
      disbaledAdd,
      modalComment,
      sortColumn,
      modalInfo
    } = this.state;
    const { data: dataPagination, itemsCount } = this.getData();
    return (
      <div style={{ marginLeft: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800 text-center">
          Manage Contribution
        </h1>
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
            {hasPermission("CONTRIBUTION.ADD_CREATE", "create") && (
              <button onClick={this.toggle} className="btn btn-info">
                Add new Contribution
              </button>
            )}
            {!disbaledAdd && (
              <p style={{ color: "red" }}>The Term is out of date</p>
            )}
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
          term={this.props.term.curterm}
        />
        <ModalDownload
          show={modalDownloadShow}
          toggle={this.toggleDownload}
          term={modalDownloadData}
        />
        
        <ModalInfo
         show={modalInfo}
         toggle={this.toggleInfo}
         contributionInfo={modalContribution}
        />

        <Table
          data={dataPagination}
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
        <div className="row justify-content-start">
          <div className="col-4">
            <Pagination
              itemsCount={itemsCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
          <div className="col-4">
            {hasPermission("CONTRIBUTION.VIEW_DOWNLOAD", "download") && (
              <button
                onClick={this.handleDownload}
                className="btn btn-success btn-sm"
              >
                <i className="fa fa-download" style={{ marginRight: 5 }} />
                Download by term
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { contribution: state.contribution, term: state.term };
};
export default connect(mapStateToProps)(ManageContribution);
