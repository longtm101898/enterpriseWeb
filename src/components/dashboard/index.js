import React, { Component } from "react";
import {toast} from 'react-toastify'

class Dashboard extends Component {
  componentDidMount() {
    toast.success("Authorized successfully!")
  }
  
  render() {
    return <div>Dashboard</div>;
  }
}

export default Dashboard;
