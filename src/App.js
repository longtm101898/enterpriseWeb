import React, { Component } from "react";
import Layout from "./hoc/layout";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./components/Register_Login/Login";
import ManageRole from "./components/Role/manageRole";
import ManageFaculties from "./components/Faculties/manageFaculties";
import ManageFunction from "./components/Function/manageFunction";
import ManageContribution from "./components/Contribution/manageContribution";
import ManageTerm from "./components/Term/manageTerm";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/dashboard";
import ProtectedRoute from "./shared/protectedRoute";
import ManageUser from "./components/User/manageUser";

class App extends Component {
  render() {
    return (
      <Layout>
        <ToastContainer />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <ProtectedRoute path="/system/role" exact component={ManageRole} />
          <Route path="/login" exact component={Login} />
          <Route path="/faculties/view" exact component={ManageFaculties} />
          <Route path="/function" component={ManageFunction}/>
          <Route path="/contribution/view" exact component={ManageContribution} />
          <Route path="/term/view" exact component={ManageTerm}/>
          <Route path="/system/user" exact component={ManageUser} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
