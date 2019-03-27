import ewApi from "../axios-ew";
import { GET_ROLE_DATA } from "./types";

export const getRoleData = () => async dispatch => {
  await ewApi
    .get("approle")
    .then(res => dispatch({ type: GET_ROLE_DATA, payload: res.data }));
};
