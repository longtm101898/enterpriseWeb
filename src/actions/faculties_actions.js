import ewApi from "../axios-ew";
import { GET_FACULTIES_DATA } from "./types";

export const getFacultiesData = () => async dispatch => {
  await ewApi
    .get("faculties", {
      headers: {
        Authorization: "Bearer ".concat(localStorage.getItem("tokenKey"))
      }
    })
    .then(res => dispatch({ type: GET_FACULTIES_DATA, payload: res.data }));
};

export const postFaculties = (fac, facId) => async dispatch => {
  await ewApi
    .post("faculties?facId=" + facId, fac)
    .then(res => console.log(res));
};

export const deleteFaculties = facId => async dispatch => {
  await ewApi.delete("faculties/" + facId).then(res => console.log(res));
};
