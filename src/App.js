import React, { Component } from "react";
import Layout from "./hoc/layout";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Register_Login/Login";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/login" exact component={Login} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
