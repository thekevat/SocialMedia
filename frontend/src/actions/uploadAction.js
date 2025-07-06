import * as uploadApi from "../Api/uploadRequest";
import { useContext } from "react";




export const uploadImage=(data)=>async(dispatch)=>{
    try{
       const response = await uploadApi.uploadImage(data);
    return response;
    }catch(error){
         console.log(error);
    } 
}
export const uploadPost = (data, socket) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });

  try {
    const newPost = await uploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });

    console.log("✅ New post uploaded:", newPost.data);

    // ✅ Wrap inside { post: ... } to match server expectations
    if (socket?.current) {
      socket.current.emit("new-post", { post: newPost.data });
    }
  } catch (error) {
    dispatch({ type: "UPLOAD_FAIL" });
    console.log("❌ Upload post failed:", error);
  }
};

export const deletePostAction = (postId, userId) => async (dispatch) => {
  try {
    await uploadApi.deletePost(postId, userId);
    dispatch({ type: "DELETE_POST", payload: postId });
  } catch (error) {
    console.error("Delete failed:", error);
  }
};