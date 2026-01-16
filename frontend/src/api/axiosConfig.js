import axios from 'axios';

// Base URL của backend
const API_BASE_URL = 'http://localhost:5000/api';

// Tạo axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Tự động gắn token vào mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Xử lý lỗi chung
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data; // Trả về data trực tiếp
  },
  (error) => {
    if (error.response) {
      // Lỗi từ server (401, 403, 404, 500, etc.)
      const { status, data } = error.response;

      if (status === 401) {
        // Token hết hạn hoặc không hợp lệ
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }

      return Promise.reject(data);
    } else if (error.request) {
      // Request được gửi nhưng không nhận được response
      return Promise.reject({
        success: false,
        message: 'Không thể kết nối tới server'
      });
    } else {
      // Lỗi khác
      return Promise.reject({
        success: false,
        message: error.message
      });
    }
  }
);

export default axiosInstance;