import ewApi from "../axios-ew";
import { GET_FACULTIES_DATA } from "./types";

export const getFacultiesData = () => async dispatch => {
  await ewApi
    .get("faculties")
    .then(res => dispatch({ type: GET_FACULTIES_DATA, payload: res.data }));
};
