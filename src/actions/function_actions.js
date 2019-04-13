import ewApi from "../axios-ew";
import { GET_FUNCTION_DATA } from "./types";

export const getFunctionData = () => async dispatch => {
  await ewApi
    .get("function")
    .then(res => dispatch({ type: GET_FUNCTION_DATA, payload: res.data }));
};
