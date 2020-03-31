import React, { Component } from "react";
import { Link } from "react-router-dom";
class dbLanding extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      postId: {},
      visible : "all"
    };
  }

onChange = e => {
  this.setState({ [e.target.id]: e.target.value });
};

onSubmit = e => {
  e.preventDefault();
  const userData = {
        post: this.state.post,
        
      };
  console.log(userData);
  this.props.loginUser(userData);
  };

  render() {
    return (
        <div className = "container">
          <div>

          </div>
        </div>
    );
  }
}
export default dbLanding;