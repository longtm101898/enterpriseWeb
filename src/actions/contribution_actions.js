import ewApi from '../axios-ew';
import {GET_CONTRIBUTION_DATA} from './types';

export const getContributionData = () => async dispatch =>{
    await ewApi
    .get("contribution")
    .then(res => dispatch({type: GET_CONTRIBUTION_DATA, payload: res.data}))
}

