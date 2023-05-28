import axios from 'axios';
import urls from './urls';
const axiosInstance = axios.create({
    // baseURL: urls.server,
    // timeout: 5000,
});
axiosInstance.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        return Promise.reject(error);
    },
);

export default axiosInstance;
