import axios from "axios";

const API = axios.create({ baseURL: "https://socialmedia-backend-67gp.onrender.com" });

export const getTimeLinePosts=(id)=>API.get(`/post/${id}/timeline`);

export const likePost=(id,userId)=>API.put(`/post/${id}/react`,{userId:userId});