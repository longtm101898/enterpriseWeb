import ewApi from '../axios-ew';
import {GET_CONTRIBUTION_DATA} from './types';

export const getContributionData = (userId,role) => async dispatch =>{
    await ewApi
    .get("contribution/pagingfaculties?userId="+userId+"&role="+role)
    .then(res => dispatch({type: GET_CONTRIBUTION_DATA, payload: res.data}))
};

export const postContribution = (conSubmit, conId, img, word,userId,termId) => async dispatch =>{
    await ewApi
    .post("contribution?conId="+conId+"&wordUrl="+word+"&imageUrl="+img+"&userId="+userId+"&termId="+termId,conSubmit 
    )
    .then(res => console.log(res)).catch(err=> console.log(err))
    
};

export const deleteContribution = (conId)=> async dispatch =>{
    await ewApi
    .delete("contribution/"+conId)
    .then(res => console.log(res))
};

export const postCommentContribution = (conId,comment,status) => async dispatch =>{
    await ewApi
    .post("contribution/updatecomment?conId="+conId+"&comment="+comment+"&status="+status
    )
    .then(res => console.log(res)).catch(err=> console.log(err))
}


