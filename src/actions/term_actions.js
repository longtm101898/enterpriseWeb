import ewApi from '../axios-ew';
import {GET_TERM_DATA} from './types';

export const getTermData = () => async dispatch =>{
    await ewApi
    .get("term")
    .then(res => dispatch({type: GET_TERM_DATA, payload: res.data}))
};

export const postTerm = (termSubmit, termId) => async dispatch =>{
    await ewApi
    .post("term?termId="+termId,termSubmit)
    .then(res =>console.log(res))
};

export const deleteTerm = (termId) => async dispatch =>{
    await ewApi
    .delete("term/" + termId)
    .then(res => console.log(res))
}



