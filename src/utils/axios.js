import axios from "axios";
import { useTokens } from "../stores/TokenStore";
import { refreshTokens } from "./utils.js";

const api = axios.create({
  baseURL: "http://localhost:5177/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const setLoading = useTokens.getState().setLoading;
    const accessToken = useTokens.getState().accessToken;
    setLoading(true);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    useTokens.getState().setLoading(false);
    return response;
  },
  async (error) => {
    useTokens.getState().setLoading(false);
    const clearTokens = useTokens.getState().clearTokens;
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const newToken = await refreshTokens();
        processQueue(null, newToken);
        originalRequest.headers.Authorization = "Bearer " + newToken;
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;