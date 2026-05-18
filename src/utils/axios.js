import axios from "axios";
import { useTokens } from "../stores/TokenStore.jsx";
import { refreshTokens } from "./utils.js";

const api = axios.create({
    baseURL: "http://13.61.32.34:8080/api",
    headers: { "Content-Type": "application/json" },
});

// request interceptor
api.interceptors.request.use((config) => {
    const accessToken = useTokens.getState().accessToken;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

// response interceptor (refresh token logic)
let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
    failedQueue.forEach(p => error ? p.reject(error) : p.resolve(token));
    failedQueue = [];
};
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (isRefreshing) {
                return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
                    .then(token => { originalRequest.headers.Authorization = `Bearer ${token}`; return api(originalRequest) });
            }
            isRefreshing = true;
            try {
                const newToken = await refreshTokens();
                processQueue(null, newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                useTokens.getState().clearTokens();
                return Promise.reject(err);
            } finally { isRefreshing = false; }
        }
        return Promise.reject(error);
    }
);

export default api;