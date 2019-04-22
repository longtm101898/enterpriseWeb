import { GET_TERM_DATA } from "../actions/types";

const initialState = {
  data: []
};
function format(inputDate) {
  var date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + date.getDate()   ;
  }
}


export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TERM_DATA:
    action.payload.map(items => {
      items.dateStarted = format(items.dateStarted);
      items.closingDate = format(items.closingDate)
    })
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
}
