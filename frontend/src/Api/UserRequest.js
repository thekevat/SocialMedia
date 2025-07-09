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

export const getUser = (userId) => API.get(`/user/${userId}`);

export const updateUser = (id, formData,token) => API.put(`/user/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getAllUsers = (token) => API.get("/user",{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const followUser = (id, data, token) =>
  API.put(`/user/${id}/follow`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const unFollowUser = (id, data, token) =>
  API.put(`/user/${id}/unfollow`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
