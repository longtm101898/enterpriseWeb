import { GET_CONTRIBUTION_DATA,GET_CONTRIBUTION_BY_ID } from "../actions/types";

const initialState = {
  data: [],
  dataById: null
};
function format(inputDate) {
  var date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return date.getDate() + '/' + (parseInt(date.getMonth()) + 1) + '/' + date.getFullYear();
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTRIBUTION_DATA:
    action.payload.map(items => {
      items.dateCreated = format(items.dateCreated)
    })
      return {
        ...state,
        data: action.payload
      };
      case GET_CONTRIBUTION_BY_ID: 
      action.payload.closingDate = format(action.payload.closingDate)
      return {
        ...state,
        dataById: action.payload
      }
    default:
      return state;
  }
}
