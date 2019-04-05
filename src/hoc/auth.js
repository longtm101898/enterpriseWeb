import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../services/authService";

export default function(ComposedClass, reload, adminRoute = null) {
  class Auth extends Component {
    state = {
      loading: true
    };
    componentDidMount() {
      this.mounted = true;
      const user = getCurrentUser();
      if (!user) {
        if (reload) {
          // this.props.history.push("/login");
        }
      }
      //check is excuted there.
      if (this.mounted) {
        this.setState({ loading: false });
      }
      //
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      if (this.state.loading) {
        return (
          <div className="main_loader">
            {/* <CircularProgress style={{ color: '#2196F3' }} thickness={7} /> */}
            Loading...
          </div>
        );
      } else {
        return <ComposedClass {...this.props} user={this.props.user} />;
      }
    }
  }
  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  return connect(mapStateToProps)(Auth);
}
