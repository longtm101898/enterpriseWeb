import { combineReducers } from "redux";
import user from './user_reducer';
import role from './role_reducer';
import faculties from './faculties_reducer';
import functions from './function_reducer';
import contribution from './contribution_reducer';
import term from './term_reducer';

const rootReducer = combineReducers({
 user,
 role,
 faculties,
 functions,
 contribution,
 term
})

export default rootReducer;