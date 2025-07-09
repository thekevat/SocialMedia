import axios from "axios";



const API=axios.create({baseURL:"http://localhost:5000"});

export const userChats=(userId,token)=>API.get(`/chat/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

