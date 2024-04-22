import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const httpService = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": "true",
  },
});

httpService.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  config.headers["x-token"] = token;

  return config;
});

export default httpService;
