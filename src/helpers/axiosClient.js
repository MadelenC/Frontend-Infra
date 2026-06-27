import axios from "axios";
import { API_BASE_URL } from "../config/constants";
import { useAuthStore } from "../zustand/AuthUsers"

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor: agrega token automáticamente
  api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const requestUrl = error.config?.url || "";
      const isLoginRequest = requestUrl.includes("/auth/login");

      if ((status === 401 || status === 403) && !isLoginRequest) {
        useAuthStore.getState().logout();

        const currentPath = window.location.pathname;
        const isAuthPage =
          currentPath === "/signin" ||
          currentPath === "/home" ||
          currentPath === "/";

        if (!isAuthPage) {
          window.location.replace("/signin?module=mantenimiento");
        }
      }

      return Promise.reject(error);
    }
  );

export default api;





