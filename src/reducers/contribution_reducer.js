import { GET_CONTRIBUTION_DATA,GET_CONTRIBUTION_BY_ID } from "../actions/types";

const initialState = {
  data: [],
  dataById: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTRIBUTION_DATA:
      return {
        ...state,
        data: action.payload
      };
      case GET_CONTRIBUTION_BY_ID: 
      return {
        ...state,
        dataById: action.payload
      }
    default:
      return state;
  }
}
