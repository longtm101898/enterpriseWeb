import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../../../services/authService";

class Header extends Component {
  state = { user: [] };
  componentDidMount() {
    var user = getCurrentUser();
    this.setState({ user });
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { user } = this.state;

    return (
      <header>
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
          <ul className="navbar-nav ml-auto">
            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow">
              <a
                className="nav-link dropdown-toggle"
                id="userDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="javascript:void(0)"
              >
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                  {user ? user.fullName : "Loading..."}
                </span>
                <img
                  className="img-profile rounded-circle"
                  src="https://source.unsplash.com/QAB-WJcbgJk/60x60"
                  alt="img"
                />
              </a>
              {/* Dropdown - User Information */}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="userDropdown"
              >
                <Link className="dropdown-item" to="/user/profile">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                  Profile
                </Link>
                <Link className="dropdown-item" to="/user/changepassword">
                  <i className="fas fa-key fa-sm fa-fw mr-2 text-gray-400" />
                  Change password
                </Link>
                <div className="dropdown-divider" />
                <a
                  className="dropdown-item"
                  data-toggle="modal"
                  data-target="#logoutModal"
                  onClick={this.handleLogout}
                  href="javascript:void(0)"
                >
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
