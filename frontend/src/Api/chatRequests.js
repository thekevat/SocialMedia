import axios from "axios";



const API=axios.create({baseURL:"https://socialmedia-backend-67gp.onrender.com"});

export const userChats=(userId,token)=>API.get(`/chat/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

