import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT } from "../actions/types";

const initialState = {
  isAuth: false,
  error: null,
  token: null
};

export default function(state = initialState, action) {
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
    default:
      return state;
  }
}
