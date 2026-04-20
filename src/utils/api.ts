import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      if (!window.location.pathname.includes('/auth') && window.location.pathname !== '/') {
        window.location.href = '/';
      }
    } else if (error.response?.status === 400) {
      // Handle Zod validation errors
      const details = error.response.data.details;
      if (details && Array.isArray(details)) {
        details.forEach((err: any) => toast.error(`${err.path}: ${err.message}`));
      } else {
        toast.error(message);
      }
    } else if (error.response?.status && error.response.status >= 500) {
      toast.error('Internal Server Error. Please try again later.');
    } else if (error.code === 'ERR_NETWORK') {
      toast.error('Network error. Check your connection.');
    }

    return Promise.reject(error);
  }
);

export default api;
