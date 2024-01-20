import axios from "axios";
import { checkAuth } from "../utils/auth";
import { ROUTES } from "../utils/routes";

const BASE_URL = "http://localhost:3000/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

apiClient.interceptors.request.use((config) => {
  console.log("url", config.url);
  if (config.url === ROUTES.home) {
    return config; // Return early
  }
    const { token } = checkAuth();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


  return config;
});

export default apiClient;
