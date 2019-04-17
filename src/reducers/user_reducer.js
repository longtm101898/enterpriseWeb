import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT,
  GET_USER_DATA,
  GET_USER_DATA_BY_ID
} from "../actions/types";

const initialState = {
  isAuth: false,
  error: null,
  token: null,
  data: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        token: action.payload.token
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        isAuth: false,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        isAuth: false
      };
    case GET_USER_DATA:
      return {
        ...state,
        data: action.payload
      };
    case GET_USER_DATA_BY_ID:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}