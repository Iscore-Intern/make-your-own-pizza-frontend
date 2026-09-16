import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Normalize URL to prevent duplicate /api/ or missing leading slashes
        if (config.url) {
            config.url = config.url.replace(/^(\/)?api\//i, '/');
            if (!config.url.startsWith('/') && !config.url.startsWith('http')) {
                config.url = `/${config.url}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;