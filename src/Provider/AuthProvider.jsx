/* eslint-disable react/prop-types */
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
    setLoading(false);
  }, []);

  const register = async (user) => {
    try {
      const { data } = await axios.post(
        "https://ph-cash-server.vercel.app/register",
        user
      );
      return data;
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "https://ph-cash-server.vercel.app/login",
        {
          email,
          password,
        }
      );
      if (data.success) {
        localStorage.setItem("token", data.token);
        const decodedUser = jwtDecode(data.token);
        setUser(decodedUser);
        return data;
      } else {
        return data;
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    // console.log("logout");
    setUser(null);
    toast.success("Logged out successfully");
  };

  const forgetPassword = async (email, password) => {
    const { data } = await axios.patch(
      `https://ph-cash-server.vercel.app/forget_password/${email}`,
      { password }
    );
    return data;
  };

  const userInfo = { user, register, login, logout, loading, forgetPassword };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
      <Toaster position="top-right" reverseOrder={true} />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
