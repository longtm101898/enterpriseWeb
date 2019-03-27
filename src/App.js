import React, { Component } from "react";
import Layout from "./hoc/layout";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Register_Login/Login";
import ManageRole from "./components/Role/manageRole";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/role" exact component={ManageRole} />
          <Route path="/login" exact component={Login} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
