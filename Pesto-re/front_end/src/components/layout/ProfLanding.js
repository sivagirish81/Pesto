import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { pestoPost } from "../../actions/pestoActions";
import jwt_decode from "jwt-decode";

const API_URI="https://pesto-blog.herokuapp.com"

class ProfLanding extends Component {
  constructor() {
    super();
    this.state = {
      post: "",
      postId: {},
      visible : "all",
      profile:[],
      isloaded : false
    };
  }

  async componentDidMount()
  {
    const userobj = jwt_decode(localStorage.getItem("jwtToken"));
    const fetchreq = `${API_URI}/api/v1/pestos/myprof?name=` + userobj.name;
    console.log(fetchreq);
    const response = await fetch(fetchreq);
    const data = await response.json();
    console.log("Data : ",data);
    this.setState({isloaded:true,profile:data});
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  onSubmit = e => {
    e.preventDefault();
    const userobj = jwt_decode(localStorage.getItem("jwtToken"));
    console.log("Posted-by : ",userobj.name);
    var cdate = Date();
    cdate = cdate.toString();
    const userData = {
          pestoid : 3,
          post: this.state.post,
          posted_by:userobj.name,
          timestamp : cdate,
          visible : "all"
        };
    console.log("userData : ",userData);
    //this.props.pestoPost(userData);
    };
    
    render() {
      const {profile} = this.state;
      console.log("Profile = ",profile);
      const userobj = jwt_decode(localStorage.getItem("jwtToken"));
      console.log("Posted-by : ",userobj.name);
      var uname = userobj.name.replace(' ','_');
      console.log("uname = ",uname);
      var pimages = './Profimages/' + uname + '.jpeg';
      console.log("HI",pimages);
      try
      {
        var myimg = require(`${pimages}`);
      }
      catch(err)
      {
        console.log(err);
        console.log("Image does not exist");
        pimages = './nprof.gif';
      }
      //console.log(pimages['Ronald']);
      return (
      <div class = "flow-text">
        <div class = "container">
          <div class  = "row card-panel blue-grey lighten-4 biggy">
            <div class = "col s3 smallen">
                <div class="card">
                    <div class="card-image">
                        <img src = {require(`${pimages}`)} alt = {require('./nprof.gif')} />
                        <span class="card-title"></span>
                     </div>
                    <div class="card-content">
                        <p>{userobj.name}</p>
                    </div>
                    {/*<div class="card-action">
                        <a href="#">Click here to view My resume</a>
                    </div>*/}
                </div> 
           </div>
           <div class = "col s9">
                  <div>
                    <>
                      {profile.map((key) => {
                        return <div><p class = "my-name"><i class="material-icons">person_pin_circle</i> : {key.name}</p><p class = "Location-text"><i class="material-icons">my_location</i> : {key.address}</p><p class = "email-text"> <i class="material-icons">email</i>  : {key.email}</p><p class = "my-phone"><i class="material-icons">phone</i> : {key.phonenum}</p></div>
                      })}
                    </>
                  </div>
            </div>
            <div class = "bottom-uploader">
                    <p>Please Upload Image as Username.jpeg at <u><a href = "https://drive.google.com/open?id=16-twviWMiCrJuBkYklp-PPdDMgSjJdK7">https://drive.google.com/open?id=16-twviWMiCrJuBkYklp-PPdDMgSjJdK7</a></u></p>
                    <p>Your Profile picture will automatically be updated within a day or two upon review</p>
                  </div>
            </div>
          </div>
        </div>
      );
    }
}

ProfLanding.propTypes = {
  pestoPost : PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { pestoPost }
)(ProfLanding);

