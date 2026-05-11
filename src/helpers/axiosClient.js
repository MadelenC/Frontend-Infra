import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor: agrega token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
   console.log("🔥 TOKEN EN INTERCEPTOR:", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;





