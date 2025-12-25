import axios from 'axios';

var v1Api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    withCredentials: true,
});

v1Api.interceptors.request.use((config) => {
    let conf = {
        ...config,
        headers: {
            ...config.headers,
            'Content-Type': config.headers['Content-Type'] ? config.headers['Content-Type'] : 'application/json',
        }
    }
    return conf;
})

v1Api.interceptors.response.use(response => {
    return response;
}, (error) => {
    return Promise.reject(error);
})

export default v1Api;