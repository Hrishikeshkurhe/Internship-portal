import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

// inject token before each request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // your login token

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
