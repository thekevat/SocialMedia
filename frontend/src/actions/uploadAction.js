import * as uploadApi from "../Api/uploadRequest";
import { useContext } from "react";
import { getToken } from "../utils/auth";

export const uploadImage = (data) => async (dispatch) => {
  const token = await getToken();
  try {
    const response = await uploadApi.uploadImage(data, token);
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      handleTokenExpiry();
    } else {
      console.error("uploadImg error:", error);
    }
  }
};
export const uploadPost = (data, socket) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  const token= await getToken();
  try {
    const newPost = await uploadApi.uploadPost(data,token);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });

    console.log("✅ New post uploaded:", newPost.data);

    // ✅ Wrap inside { post: ... } to match server expectations
    if (socket?.current) {
      socket.current.emit("new-post", { post: newPost.data });
    }
  } catch (error) {
    dispatch({ type: "UPLOAD_FAIL" });
     if (error.response?.status === 401) {
      handleTokenExpiry();
    } else {
      console.error("uploadPost error:", error);
    }
  }
};

export const deletePostAction = (postId, userId) => async (dispatch) => {
  const token= await getToken();
  try {
    await uploadApi.deletePost(postId, userId,token);
    dispatch({ type: "DELETE_POST", payload: postId });
  } catch (error) {
     if (error.response?.status === 401) {
      handleTokenExpiry();
    } else {
      console.error("delete error:", error);
    }
  }
};
const handleTokenExpiry = () => {
  alert("Session expired. Please log in again.");
  localStorage.clear();
  window.location.href = "/auth";
};
