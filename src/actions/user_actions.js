import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT } from "./types";
import history from "../history";
import ewApi from "../axios-ew";

export const loginUser = dataSubmit => async dispatch => {

  await ewApi
    .post("account/login", dataSubmit)
    .then(res => dispatch(loginUserSuccess(res.data)))
    .catch(err => dispatch(loginUserFail(err)));
};

export const loginUserSuccess = data => {
  // console.log(data);
  localStorage.setItem("tokenKey", data.token);
  history.replace('/')
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
