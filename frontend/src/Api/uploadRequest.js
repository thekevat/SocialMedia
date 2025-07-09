import axios from "axios";
const API=axios.create({baseURL:"http://localhost:5000"});
export const uploadImage=(data,token)=>API.post('/upload/',data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 

export const uploadPost=(data,token)=>API.post('/post',data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deletePost = (postId, userId, token) =>
  API.delete(`/post/${postId}`, {
    data: { userId }, // 👈 body for DELETE
    headers: {
      Authorization: `Bearer ${token}`, // 👈 token in header
    },
  });
