import React, { Component } from "react";
import Layout from "./hoc/layout";

class App extends Component {
  render() {
    return (
      <Layout>
        <div className="App">Hello world</div>
      </Layout>
    );
  }
}

export default App;
