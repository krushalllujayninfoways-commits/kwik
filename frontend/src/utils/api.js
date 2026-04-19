import axios from "axios";

function getApiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();

  if (!configuredUrl) {
    return "/api";
  }

  return configuredUrl.endsWith("/") ? configuredUrl.slice(0, -1) : configuredUrl;
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === "ECONNABORTED" ? "Request timed out" : "Network error. Please check your connection.");

    return Promise.reject(new Error(message));
  }
);

export default api;
