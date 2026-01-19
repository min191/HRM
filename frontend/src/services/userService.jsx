import { getEmployees } from "./employeeService";
import { ROLES } from "../auth/roles";

/* ===== USER HỆ THỐNG ===== */
export const users = [
  { id: 1, username: "admin", password: "123", role: ROLES.ADMIN, name: "Admin System" },
  { id: 2, username: "hr", password: "123", role: ROLES.HR, name: "Nhân sự" },
  { id: 3, username: "ketoan", password: "123", role: ROLES.KETOAN, name: "Kế toán" },
  { id: 4, username: "nhanvien", password: "123", role: ROLES.NHANVIEN, name: "Nhân viên" },
  { id: 5, username: "giamdoc", password: "123", role: ROLES.GIAMDOC, name: "Giám đốc" },
];

/* ROLE LUÂN PHIÊN CHO EMPLOYEE */
const EMPLOYEE_ROLES = [ROLES.HR, ROLES.KETOAN, ROLES.NHANVIEN];

/* ===== TẠO USER TỪ EMPLOYEE ===== */
export const getEmployeeUsers = async () => {
  const employees = await getEmployees();

  return employees.map((emp, index) => ({
    id: emp.id + 1000,
    username: emp.email,
    password: "123",
    role: EMPLOYEE_ROLES[index % EMPLOYEE_ROLES.length],
    name: emp.name,
  }));
};

/* ===== LOGIN ===== */
export const login = async (username, password) => {
  const employeeUsers = await getEmployeeUsers();
  const allUsers = [...users, ...employeeUsers];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = allUsers.find(
        (u) => u.username === username && u.password === password
      );
      user ? resolve(user) : reject("Sai tài khoản hoặc mật khẩu");
    }, 500);
  });
};

/* ===== LẤY DANH SÁCH USER + EMPLOYEE INFO ===== */
export const getUserList = async () => {
  const employees = await getEmployees();
  const employeeUsers = await getEmployeeUsers();

  const employeeUserWithInfo = employeeUsers.map((user) => {
    const emp = employees.find((e) => e.email === user.username);
    return {
      ...user,
      employeeCode: emp?.employeeCode || "",
      department: emp?.department || "",
      position: emp?.position || "",
      workStatus: emp?.workStatus || "",
    };
  });

  return [...users, ...employeeUserWithInfo];
};
