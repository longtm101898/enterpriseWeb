import { combineReducers } from "redux";
import user from './user_reducer';
import role from './role_reducer';
import faculties from './faculties_reducer';

const rootReducer = combineReducers({
 user,
 role,
 faculties
})

export default rootReducer;