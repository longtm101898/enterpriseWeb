import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Footer from "../components/Header_Footer/Footer";
import Header from "../components/Header_Footer/Header";
import SidebarLeft from "../components/Sidebar/Sidebar";
import { logout } from "../actions/user_actions";
import "./layout.css";

class Layout extends Component {
  logout = () => {
    this.props.history.push("/login");
    this.props.dispatch(logout());
  };
  render() {
    if (window.location.pathname === "/login") {
      document.body.classList.add("bg-gradient-primary");
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-12 col-md-8">
              <div className="card o-hidden border-0 shadow-lg my-5">
                <div className="card-body p-0">{this.props.children}</div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id="wrapper">
          <SidebarLeft />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Header logout={this.logout} />
              <div className="container-fluid">{this.props.children}</div>
            </div>
            <Footer />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.user
  };
};

export default connect(mapStateToProps)(withRouter(Layout));
