import ewApi from "../axios-ew";
import { GET_ROLE_DATA } from "./types";

export const getRoleData = () => async dispatch => {
  await ewApi
    .get("approle", {
      headers: {
        Authorization: "Bearer ".concat(localStorage.getItem("tokenKey"))
      }
    })
    .then(res => dispatch({ type: GET_ROLE_DATA, payload: res.data }))
    .catch(err => console.log(err));
};

export const postData = (role) => async dispatch =>{
  await ewApi
  .post("approle/save", role)
  .then(res =>console.log(res));
};

export const putData = (role, roleId) => async dispatch =>{
  await ewApi
  .put("approle?roleId=" + roleId, role)
  .then(res => console.log(res));
};

export const deleteData = (roleId) => async dispatch =>{
  await ewApi
  .delete("approle/" + roleId)
  .then(res => console.log(res));
}
