import { GET_CONTRIBUTION_DATA } from "../actions/types";

const initialState = {
  data: []
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
      items.periodEdited = format(items.periodEdited)
    })
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
