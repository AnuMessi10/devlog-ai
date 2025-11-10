import axios from 'axios';

const instance = axios.create({
    baseURL: '/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

instance.interceptors.response.use(
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

export const client = () => instance;

export { instance as http };
