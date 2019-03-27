import { combineReducers } from "redux";
import user from './user_reducer';
import role from './role_reducer';

const rootReducer = combineReducers({
 user,
 role
})

export default rootReducer;