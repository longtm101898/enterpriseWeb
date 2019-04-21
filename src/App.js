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
import UserProfile from "./components/User/userProfile";

class App extends Component {
  render() {
    return (
      <Layout>
        <ToastContainer />
        <Switch>
          <ProtectedRoute path="/" exact component={Dashboard} />
          <ProtectedRoute path="/system/role" exact component={ManageRole} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute
            path="/system/faculties"
            exact
            component={ManageFaculties}
          />
          <ProtectedRoute path="/function" component={ManageFunction} />
          <ProtectedRoute
            path="/contribution/view"
            exact
            component={ManageContribution}
          />
          <ProtectedRoute path="/system/term" exact component={ManageTerm} />
          <ProtectedRoute path="/system/user" exact component={ManageUser} />
          <ProtectedRoute path="/user/profile" exact component={UserProfile} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
