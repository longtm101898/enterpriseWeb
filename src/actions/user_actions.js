import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT,
  GET_USER_DATA,
  GET_USER_DATA_BY_ID
} from "./types";
import history from "../history";
import ewApi from "../axios-ew";
import { toast } from "react-toastify";

export const loginUser = dataSubmit => async dispatch => {
  await ewApi
    .post("account/login", dataSubmit)
    .then(res => dispatch(loginUserSuccess(res.data)))
    .catch(err => dispatch(loginUserFail(err)));
};

export const loginUserSuccess = data => {
  // console.log(data);
  localStorage.setItem("tokenKey", data.token);
  history.replace("/");
  // window.location.pathname = "/";
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data
  };
};
export const loginUserFail = data => {
  // console.log(data)
  return {
    type: LOGIN_USER_FAIL,
    payload: data
  };
};

export const logout = () => {
  localStorage.removeItem("tokenKey");
  return {
    type: LOGOUT,
    payload: null
  };
};

export const getUserData = () => async dispatch => {
  await ewApi
    .get("user", {
      headers: {
        Authorization: "Bearer ".concat(localStorage.getItem("tokenKey"))
      }
    })
    .then(res => dispatch({ type: GET_USER_DATA, payload: res.data }));
};
export const getUserDataById = id => async dispatch => {
  await ewApi
    .get("user/" + id)
    .then(res => dispatch({ type: GET_USER_DATA_BY_ID, payload: res.data }));
};

export const postUser = (userSubmit, userId) => async dispatch => {
  await ewApi
    .post("user?userId=" + userId, userSubmit)
    .then(res => toast.success(res.data))
     .catch(err => toast.error(err))
};

export const deleteUser = userId => async dispatch => {
  await ewApi.delete("user/" + userId).then(res => console.log(res));
};

export const postUserProfile = (
  userId,
  fullName,
  phoneNumber,
  avatar
) => async dispatch => {
  await ewApi
    .post(
      "user/updateuserprofile?userId=" +
        userId +
        "&fullName=" +
        fullName +
        "&phoneNumber=" +
        phoneNumber +
        "&avatar=" +
        avatar
    )
    .then(res => console.log(res));
};
