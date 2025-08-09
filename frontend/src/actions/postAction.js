import * as PostApi from "../Api/PostRequest.js"
import {getToken} from "../utils/auth.js"

export const getTimeLinePosts=(id)=>async(dispatch)=>{
    const token=getToken();
    dispatch({type:"RETRIEVING_START"})
    try{
      const {data}=await PostApi.getTimeLinePosts(id,token);
      dispatch({type:"RETRIEVING_SUCCESS",data:data})
    }catch(error){
       console.log(error);
       dispatch({type:"RETRIEVE_FAIL"})
    }
}