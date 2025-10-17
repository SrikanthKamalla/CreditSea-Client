import axios from "axios";
import { getAuthToken, removeAuthToken } from "../helpers/localstorage";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const axiosBaseInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosBaseInstance.interceptors.request.use(
  function (config) {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    // Remove Content-Type for FormData (file uploads)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    console.log("API Request:", config.method?.toUpperCase(), config.url);
    return config;
  },
  function (error) {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - UPDATED
axiosBaseInstance.interceptors.response.use(
  function (response) {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  function (error) {
    console.error("API Error Details:", {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    // Only redirect to login for 401 errors on protected routes
    // Don't redirect for login/signup pages
    const isAuthRoute = error.config?.url.includes("/auth/");

    if (error.response?.status === 401 && !isAuthRoute) {
      console.log("Unauthorized access, redirecting to login");
      // removeAuthToken();
      // Use setTimeout to avoid interrupting the current error handling
      // setTimeout(() => {
      //   window.location.href = "/login";
      // }, 100);
    }

    return Promise.reject(error);
  }
);

export default axiosBaseInstance;
