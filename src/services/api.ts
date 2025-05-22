import axios from "axios";
import { getCookie } from "../utils/getCookies";

const api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const token = getCookie("accessToken");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
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
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    await new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    });
                    return await api(originalRequest);
                } catch (err) {
                    return await Promise.reject(err);
                }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise((resolve, reject) => {
                api.post("/refresh")
                    .then(() => {
                        processQueue(null);
                        resolve(api(originalRequest));
                    })
                    .catch((err) => {
                        processQueue(err, null);
                        reject(err);
                    })
                    .finally(() => {
                        isRefreshing = false;
                    });
            });
        }

        return Promise.reject(error);
    }
);

export default api;
