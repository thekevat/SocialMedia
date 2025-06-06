import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

// API.interceptors.request.use((req) => {
//     const profile = localStorage.getItem('profile');
//     if (profile) {
//         const parsedProfile = JSON.parse(profile); // Parse the string into an object
//         req.headers.authorization = `Bearer ${parsedProfile.token}`; // Use the correct header name
//     }
//     return req;
// });

export const getUser=(userId)=>API.get(`/user/${userId}`);

export const updateUser=(id,formData)=>API.put(`/user/${id}`,formData);

export const getAllUsers=()=>API.get('/user');

export const followUser=(id,data)=>API.put(`/user/${id}/follow`,data);

export const unFollowUser=(id,data)=>API.put(`/user/${id}/unfollow`,data);