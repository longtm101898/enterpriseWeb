import ewApi from "../axios-ew";
import { GET_ROLE_DATA } from "./types";

const authString = "Bearer ".concat(localStorage.getItem("tokenKey"));

export const getRoleData = () => async dispatch => {
  await ewApi
    .get("approle", { headers: { Authorization: authString } })
    .then(res => dispatch({ type: GET_ROLE_DATA, payload: res.data }))
    .catch(err => console.log(err));
};
