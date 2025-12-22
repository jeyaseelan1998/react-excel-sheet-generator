import axios from 'axios';

var api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    let conf = {
        ...config,
        headers: {
            ...config.headers,
            'Content-Type': config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/json',
        }
    }
    return conf;
})

api.interceptors.response.use(response => {
    return response;
}, (error) => {
    return Promise.reject(error);
})

export default api;