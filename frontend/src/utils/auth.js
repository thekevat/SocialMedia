import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
};

export const getToken = () => {
  try {
    const profile = JSON.parse(localStorage.getItem("profile"));
    return profile?.token || null;
  } catch {
    return null;
  }
};
