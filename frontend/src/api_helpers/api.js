import axios from 'axios';

// Connect directly to your live Render backend server
const API_URL = 'https://dsa-tracker-api-n95q.onrender.com/api';

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

// Authentication endpoints expected by your AuthContext
export const apiLogin = async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    if (response.data.token) localStorage.setItem('token', response.data.token);
    return response.data;
};

export const apiRegister = async (userData) => {
    const response = await API.post('/auth/register', userData);
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