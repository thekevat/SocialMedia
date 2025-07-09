import axios from "axios";

const API = axios.create({ baseURL: "https://socialmedia-backend-67gp.onrender.com" });

export const logIn = async (formData) =>await API.post('/auth/login',formData);

export const signUp = async (formData) =>await API.post('/auth/register',formData);
