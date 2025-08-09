import axios from "axios";

const API = axios.create({ baseURL: "https://socialmedia-backend-67gp.onrender.com" });

export const getTimeLinePosts = (id,token) => API.get(`/post/${id}/timeline`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

export const likePost = (id, userId, token) =>
  API.put(
    `/post/${id}/react`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
