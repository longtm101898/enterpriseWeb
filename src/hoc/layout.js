import React, { Component } from "react";
import Footer from "../components/Header_Footer/Footer";
import Header from "../components/Header_Footer/Header";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">container</div>
        <Footer />
      </div>
    );
  }
}
