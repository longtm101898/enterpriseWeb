import ewApi from '../axios-ew';
import {GET_TERM_DATA} from './types';

export const getTermData = () => async dispatch =>{
    await ewApi
    .get("term")
    .then(res => dispatch({type: GET_TERM_DATA, payload: res.data}))
}

