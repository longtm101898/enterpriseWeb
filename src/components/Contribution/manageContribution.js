import React, { Component } from "react";
import { connect } from "react-redux";
import { paginate } from "../utils/paginate";
import Table from "../utils/table/table";
import { getContributionData } from "../../actions/contribution_actions";
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
    {
      path: "fileURL",
      label: "File URL"
    },
    {
      path: "imageURL",
      label: "Image URL"
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
        </React.Fragment>
      )
    }
  ];
  handleDelete = con => {
    alert(con.id);
  };

  handleSubmit = (conSubmit, conId) => {
    console.log(conSubmit)
    console.log(conId)
  }

  showUpdateForm(con) {
    this.setState({
      modalShow: !this.state.modalShow,
      modalContribution: con
    });
  }

  componentDidMount = async () => {
    var { Id: userId } = getCurrentUser();
    await this.props.dispatch(getContributionData());
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
    const dataPagination = paginate(
      this.props.contribution.data,
      currentPage,
      pageSize
    );
    return { data: dataPagination };
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
      modalContribution,
      modalShow
    } = this.state;
    const { data: dataPagination } = this.getData();
    const itemsCount = this.props.contribution.data.length;
    return (
      <div style={{ marginLeft: "100px", marginRight: "50px" }}>
        <h1 className="h3 mb-2 text-gray-800">Manage Contribution</h1>
        <button onClick={this.toggle}>Add new Contribution</button>
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
  return { contribution: state.contribution };
};
export default connect(mapStateToProps)(ManageContribution);
