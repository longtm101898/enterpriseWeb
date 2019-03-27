import React, { Component } from "react";
import { connect } from "react-redux";


export default function(ComposedClass, reload, adminRoute = null) {
  class Auth extends Component {
    state = {
      loading: true
    };
    componentDidMount() {
      this.mounted = true;

      //check is excuted there.

      //
      
    }

    render() {
      return <div />;
    }
  }
  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  return connect(mapStateToProps)(Auth);
}
