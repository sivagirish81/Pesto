import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <nav class="nav-extended">
        <div className="nav-wrapper black">
          <a href="#" class="brand-logo center"><i class="material-icons">ac_unit</i>PESTO</a>
          <ul class="right hide-on-med-and-down">
            <li><a class="waves-effect waves-light btn-large" onClick={this.onLogoutClick}>Logout</a></li>
          </ul>
        </div>
        <div class="nav-content green">
          <ul class="tabs tabs-transparent">
            <li class="tab">
              <a href = "#test1">
              <Link
              to="/dashboard"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
              >
              </Link>
              Dashboard
              </a>
            </li>
            <li class="tab">
            <a href = "#test2">
              <Link
                to="/Find-Friends"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
              </Link>
              Find Friends
              </a>
            </li>
            <li class="tab disabled">
            <a href = "#test3">
              <Link
                to="/MyProf"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
              </Link>
              My Profile
            </a>
            </li>
            <li class="tab">
            <a href = "#test4">
              <Link
                to="/AbtUs"
                style={{
                  fontFamily: "monospace"
                }}
                className="col s5 brand-logo center black-text"
              >
              </Link>
              About US
            </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
