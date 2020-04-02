import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pestoPost } from "../../actions/pestoActions";
import jwt_decode from "jwt-decode";

class dbLanding extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      postId: {},
      visible : "all",
      readablePosts:[],
      isloaded : false
    };
  }

  async componentDidMount()
  {
    // As soon as it mounts it has to display all pestos
    console.log("Owner = ",jwt_decode(localStorage.getItem("jwtToken")));
    const response = await fetch('/api/v1/pestos/display');
    const data = await response.json();
    console.log("Data : ",data);
    this.setState({isloaded:true,readablePosts:data});
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    var cdate = Date();
    cdate = cdate.toString();
    const userData = {
          pestoid : 3,
          post: this.state.post,
          timestamp : cdate,
          visible : "all"
        };
    console.log(userData);
    this.props.pestoPost(userData);
    };
    
    render() {
      const {readablePosts} = this.state;
      return (
        <div class = "container">
        <>
          {readablePosts.map((key) => {
            return <div class = "card-panel blue-grey lighten - 4 pestostyle"><i class="material-icons tsize">ac_unit</i>{key.posted_by}<div class = "pestotext">{key.post}</div></div>
            })}
        </>
        </div>
      );
    }
}

dbLanding.propTypes = {
  pestoPost : PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { pestoPost }
)(dbLanding);

