import ewApi from "../axios-ew";
import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AUTH_USER_FAIL,
  AUTH_USER_SUCCESS
} from "./types";

export const loginUser = (dataSubmit) => async dispatch => {
    await ewApi.post('account/login', dataSubmit)
    .then(res=> dispatch(loginUserSuccess(res.data)))
    .catch(err=>dispatch(loginUserFail(err)))
}

export const loginUserSuccess = (data) => {
    console.log(data);
    localStorage.setItem("tokenKey", data.token)
    return {
        type: LOGIN_USER_SUCCESS,
        payload: data
    }
}
export const loginUserFail = (data) => {
    return {
        type: LOGIN_USER_FAIL,
        payload: data
    }
}