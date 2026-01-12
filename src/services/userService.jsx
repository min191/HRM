import { getEmployees } from "./employeeService";

import { ROLES } from "../auth/roles";

export const users = [
  { id: 1, username: "admin", password: "123", role: ROLES.ADMIN, name: "Admin System" },
  { id: 2, username: "hr", password: "123", role: ROLES.HR, name: "Nhân sự" },
  { id: 3, username: "accountant", password: "123", role: ROLES.KETOAN, name: "Kế toán" },
  { id: 4, username: "employee", password: "123", role: ROLES.NHANVIEN, name: "Nhân viên" },
];

const roles = [ROLES.HR, ROLES.KETOAN, ROLES.NHANVIEN];


// Tạo user từ EMPLOYEES
export const EMPLOYEE_USERS = async () => {
  const employees = await getEmployees();
  return employees.map((emp, index) => ({
    id: emp.id + 1000, // tránh trùng id với users cố định
    username: emp.email,
    password: "123",
    role: roles[index % roles.length],
    name: emp.name,
  }));
};

// Login function
export const login = async (username, password) => {
  const employeeUsers = await EMPLOYEE_USERS();
  const allUsers = [...users, ...employeeUsers]; // kết hợp

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = allUsers.find(
        (u) => u.username === username && u.password === password
      );
      user ? resolve(user) : reject("Sai tài khoản hoặc mật khẩu");
    }, 500);
  });
};

// Lấy danh sách user kết hợp info employee
export const getUserList = async () => {
  const employees = await getEmployees();
  const employeeUsers = employees.map((emp, index) => ({
    id: emp.id + 1000,
    username: emp.email,
    password: "123",
    role: roles[index % roles.length],
    name: emp.name,
  }));

  // kết hợp với thông tin employee
  const userList = employeeUsers.map((user) => {
    const employee = employees.find((e) => e.email === user.username);
    return {
      ...user,
      employeeCode: employee?.employeeCode || "",
      department: employee?.department || "",
      position: employee?.position || "",
      workStatus: employee?.workStatus || "",
    };
  });

  return [...users, ...userList]; // trả về cả user hệ thống + user từ employee
};
