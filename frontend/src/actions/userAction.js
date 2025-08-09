import * as userApi from "../Api/UserRequest";
import { getToken } from "../utils/auth";


export const updateUser = (id, formData) => async (dispatch) => {
   const token= await getToken();

  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await userApi.updateUser(id, formData,token);
    dispatch({ type: "UPDATING_SUCCESS", data });
  } catch (error) {
     if (error.response?.status === 401) {
      handleTokenExpiry();
    } else {
      console.error("update error:", error);
    }
  }
};

export const followUser = (id, data) => async (dispatch) => {
  const token= await getToken();

  
  dispatch({ type: "FOLLOW_USER", data: id });

  try {
    const res=await userApi.followUser(id, data, token);
    return res;
  } catch (error) {
    if (error.response?.status === 401) {
      handleTokenExpiry();
    } else {
      console.error("Follow error:", error);
    }
  }
};

export const unFollowUser = (id, data) => async (dispatch) => {
   const token= await getToken();

 
  dispatch({ type: "UNFOLLOW_USER", data: id });

  try {
    const res=await userApi.unFollowUser(id, data, token);
    return res;
  } catch (error) {
    if (error.response?.status === 401) {
      handleTokenExpiry();
    } else {
      console.error("Unfollow error:", error);
    }
  }
};

// 🔒 Utility function to handle expired token
const handleTokenExpiry = () => {
  alert("Session expired. Please log in again.");
   window.location.href = "/auth";
  localStorage.clear();
 
};
