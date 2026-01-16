import axiosInstance from './axiosConfig';

export const authApi = {
  // Đăng nhập
  login: async (username, password) => {
    const response = await axiosInstance.post('/auth/login', {
      username,
      password
    });
    return response;
  },

  // Đăng xuất
  logout: async () => {
    const response = await axiosInstance.post('/auth/logout');
    return response;
  },

  // Lấy thông tin user hiện tại
  getCurrentUser: async () => {
    const response = await axiosInstance.get('/auth/me');
    return response;
  },

  // Đổi mật khẩu
  changePassword: async (oldPassword, newPassword) => {
    const response = await axiosInstance.post('/auth/change-password', {
      oldPassword,
      newPassword
    });
    return response;
  }
};