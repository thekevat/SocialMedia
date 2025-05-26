import * as userApi from "../Api/UserRequest";
export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await userApi.updateUser(id, formData);
    dispatch({ type: "UPDATING_SUCCESS", data });
  } catch (error) {
    dispatch({ type: "UPDATING FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER" ,data:id});
  userApi.followUser(id,data)
};
export const unFollowUser=(id,data)=>async(dispatch)=>{
   dispatch({type:"UNFOLLOW_USER",data:id});
   userApi.unFollowUser(id,data)
}