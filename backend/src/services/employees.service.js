// src/services/employees.service.js
const repo = require("../repositories/employees.repo");

async function listEmployees({ q, limit, offset }) {
  return repo.listEmployees({ q, limit, offset });
}

async function getEmployee(id) {
  return repo.getEmployeeById(id);
}

async function createEmployee(data) {
  // business rule nhỏ: ép uppercase mã nhân viên
  const payload = { ...data, employeeCode: data.employeeCode.trim().toUpperCase() };
  return repo.createEmployee(payload);
}

async function updateEmployee(id, data) {
  return repo.updateEmployee(id, data);
}

async function deleteEmployee(id) {
  return repo.deleteEmployee(id);
}

module.exports = {
  listEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};