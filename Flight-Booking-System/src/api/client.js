import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL,
});

export function setAuthToken(token) {
  if (token) {
    // Send with Bearer prefix
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
}

const stored = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
if (stored) setAuthToken(stored);
