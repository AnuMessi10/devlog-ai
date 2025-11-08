import axios from 'axios';

export const http = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

http.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            return Promise.reject(error);
        }

        return Promise.reject(
            new Error('Unable to reach the server. Please check your connection and try again.')
        );
    }
);
