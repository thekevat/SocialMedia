import axios from "axios";

const API = axios.create({ baseURL: "https://socialmedia-backend-67gp.onrender.com" });

export const getMessages = (id) => API.get(`/message/${id}`);

export const addMessages = (data, token) =>
  API.post("/message/", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
