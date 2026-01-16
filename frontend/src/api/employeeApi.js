import axiosInstance from './axiosConfig';

export const employeeApi = {
  // Lấy danh sách nhân viên
  getAllEmployees: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.status) params.append('status', filters.status);
    if (filters.employeeType) params.append('employeeType', filters.employeeType);
    if (filters.search) params.append('search', filters.search);

    const response = await axiosInstance.get(`/employees?${params}`);
    return response;
  },

  // Lấy chi tiết nhân viên
  getEmployeeById: async (id) => {
    const response = await axiosInstance.get(`/employees/${id}`);
    return response;
  },

  // Tạo nhân viên mới
  createEmployee: async (employeeData) => {
    const response = await axiosInstance.post('/employees', employeeData);
    return response;
  },

  // Cập nhật nhân viên
  updateEmployee: async (id, employeeData) => {
    const response = await axiosInstance.put(`/employees/${id}`, employeeData);
    return response;
  },

  // Xóa nhân viên
  deleteEmployee: async (id) => {
    const response = await axiosInstance.delete(`/employees/${id}`);
    return response;
  },

  // Lấy lịch sử công tác
  getWorkHistory: async (employeeId) => {
    const response = await axiosInstance.get(`/employees/${employeeId}/work-history`);
    return response;
  }
};