import axios from 'axios';

// API URL — uses environment variable if set, otherwise falls back to live Render backend
const API_URL = import.meta.env.VITE_API_URL || 'https://dsa-tracker-api-n95q.onrender.com/api';

// Helper to get token from localStorage
export const hasToken = () => !!localStorage.getItem('token');

// Create an axios instance with automatic header injection
const API = axios.create({
    baseURL: API_URL,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Extract backend error messages instead of showing generic Axios errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

// Authentication endpoints expected by your AuthContext
export const apiLogin = async (email, password) => {
    const response = await API.post('/auth/login', { email, password });
    if (response.data.token) localStorage.setItem('token', response.data.token);
    return response.data;
};

export const apiRegister = async (fullName, email, password) => {
    const response = await API.post('/auth/register', { fullName, email, password });
    if (response.data.token) localStorage.setItem('token', response.data.token);
    return response.data;
};

export const apiLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/auth';
};

export const apiGetCurrentUser = async () => {
    const response = await API.get('/auth/me');
    return response.data;
};

export default API;