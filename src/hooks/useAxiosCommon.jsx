import axios from "axios";
export const axiosCommon = axios.create({
  baseURL: "https://ph-cash-server.vercel.app",
  withCredentials: true,
});

const useAxiosCommon = () => {
  return axiosCommon;
};

export default useAxiosCommon;
