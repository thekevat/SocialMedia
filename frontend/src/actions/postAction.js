import * as PostApi from "../Api/PostRequest.js"

export const getTimeLinePosts=(id)=>async(dispatch)=>{
    dispatch({type:"RETRIEVING_START"})
    try{
      const {data}=await PostApi.getTimeLinePosts(id);
      dispatch({type:"RETRIEVING_SUCCESS",data:data})
    }catch(error){
       console.log(error);
       dispatch({type:"RETRIEVE_FAIL"})
    }
}