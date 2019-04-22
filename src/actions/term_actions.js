import ewApi from '../axios-ew';
import {GET_TERM_DATA, GET_CURRENT_TERM} from './types';

export const getTermData = () => async dispatch =>{
    await ewApi
    .get("term")
    .then(res => dispatch({type: GET_TERM_DATA, payload: res.data}))
};

export const postTerm = (termSubmit, termId) => async dispatch =>{
    await ewApi
    .post("term?termId="+termId,termSubmit)
    
};

export const deleteTerm = (termId) => async dispatch =>{
    await ewApi
    .delete("term/" + termId)
    
}

export const getCurrentTerm = () => async dispatch =>{
    await ewApi
    .get("term/getcurrentterm")
    .then(res => dispatch({type: GET_CURRENT_TERM, payload: res.data }))
}



