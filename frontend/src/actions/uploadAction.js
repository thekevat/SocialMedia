import * as uploadApi from "../Api/uploadRequest";
export const uploadImage=(data)=>async(dispatch)=>{
    try{
       const response = await uploadApi.uploadImage(data);
    return response;
    }catch(error){
         console.log(error);
    } 
}
export const uploadPost=(data)=>async(dispatch)=>{
    dispatch({type:"UPLOAD_START"});
    try{
        const newPost=await uploadApi.uploadPost(data);
        dispatch({type:"UPLOAD_SUCCESS",data:newPost.data});
    }catch(error){
        dispatch({type:"UPLOAD_FAIL"});
        console.log(error);
    } 
}