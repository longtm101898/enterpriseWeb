import { GET_TERM_DATA, GET_CURRENT_TERM} from "../actions/types";

const initialState = {
  data: [],
  dataById: null,
  curterm: null
};
function format(inputDate) {
  var date = new Date(inputDate);
  if (!isNaN(date.getTime())) {
      // Months use 0 index.
      return date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2);
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
      case GET_CURRENT_TERM:
      return{
        ...state,
        curterm: action.payload
      }
  
    default:
      return state;
  }
}
