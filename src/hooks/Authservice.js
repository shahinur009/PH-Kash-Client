import axios from "axios";

const API_URL = "https://ph-cash-server.vercel.app";

const register = (hrData) => {
  // console.log("login");
  return axios.post(`${import.meta.env.VITE_API_URL}/register`, hrData);
};

const login = (email, password) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/user`, {
    email,
    password,
  });
};

const getCurrentUser = () => {
  return axios.get(API_URL + "me", {
    headers: { "x-auth-token": localStorage.getItem("authToken") },
  });
};

const authService = {
  register,
  login,
  getCurrentUser,
};

export default authService;
