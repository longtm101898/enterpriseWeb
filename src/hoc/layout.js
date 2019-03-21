import React, { Component } from "react";
import Footer from "../components/Header_Footer/Footer";
import Header from "../components/Header_Footer/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import './layout.css'
export default class Layout extends Component {
  render() {
    return (
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Header />
            <div className="container-fluid">container</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
