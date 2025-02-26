import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: "https://ph-cash-server.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      console.log("token", token);
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      } else {
        logout();
        navigate("/login");
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosSecure.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response?.status;
      // if (status === 401 || status === 403) {
      //   await logout();
      //   navigate("/login");
      // }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
