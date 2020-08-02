import axios from "axios";
import setAuthToken from "../Utils/authHandler";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";

const API_URI="https://pesto-blog.herokuapp.com"

export const pestoPost = (userData, history) => dispatch => {
  axios
    .post(`${API_URI}/api/v1/pestos/post`, userData , {timeout : 5000})
    .then(res => history.push("/"))
};

export const readPosts = (userData, history) => dispatch => {
  axios
    .post(`${API_URI}/api/v1/pestos/display`, userData)
    .then(res => history.push("/"))
    .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
    );
};
