import React, { Component } from "react";
import Layout from "./hoc/layout";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Register_Login/Login";
import ManageRole from "./components/Role/manageRole";
import ManageFaculties from "./components/Faculties/manageFaculties";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/dashboard";

class App extends Component {
  render() {
    return (
      <Layout>
        <ToastContainer />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/role" exact component={ManageRole} />
          <Route path="/login" exact component={Login} />
          <Route path="/faculties" exact component={ManageFaculties} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
