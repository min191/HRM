// src/controllers/employees.controller.js
const ApiError = require("../utils/ApiError");
const service = require("../services/employees.service");

// Hàm kiểm tra email hợp lệ
const isEmail = (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Hàm kiểm tra kiểu dữ liệu ngày hợp lệ
const isDateLike = (v) => !v || !Number.isNaN(Date.parse(v));

// Hàm kiểm tra dữ liệu đầu vào khi tạo nhân viên
function validateCreate(body) {
  if (!body.employeeCode) throw new ApiError(400, "employeeCode is required");
  if (!body.name) throw new ApiError(400, "name is required");
  if (!isEmail(body.email)) throw new ApiError(400, "email is invalid");
  ["dob", "politicalPartyDate", "youthUnionDate", "startDate", "endDate"].forEach((k) => {
    if (!isDateLike(body[k])) throw new ApiError(400, `${k} is invalid date`);
  });
  if (body.familyInfo != null && Number(body.familyInfo) < 0)
    throw new ApiError(400, "familyInfo must be >= 0");
}

// Controller cho việc liệt kê nhân viên
async function listEmployees(req, res, next) {
  try {
    const result = await service.list(req.query);
    res.json({ success: true, ...result });
  } catch (e) {
    next(e);
  }
}

// Controller cho việc lấy thông tin nhân viên theo ID
async function getEmployeeById(req, res, next) {
  try {
    const emp = await service.getById(req.params.id);
    if (!emp) throw new ApiError(404, "Employee not found");
    res.json({ success: true, data: emp });
  } catch (e) {
    next(e);
  }
}

// Controller cho việc tạo mới nhân viên
async function createEmployee(req, res, next) {
  try {
    validateCreate(req.body); // Kiểm tra dữ liệu đầu vào
    const created = await service.create(req.body);
    res.status(201).json({ success: true, data: created });
  } catch (e) {
    next(e);
  }
}

// Controller cho việc cập nhật thông tin nhân viên
async function updateEmployee(req, res, next) {
  try {
    if (!isEmail(req.body.email)) throw new ApiError(400, "email is invalid");
    ["dob", "politicalPartyDate", "youthUnionDate", "startDate", "endDate"].forEach((k) => {
      if (!isDateLike(req.body[k])) throw new ApiError(400, `${k} is invalid date`);
    });
    if (req.body.familyInfo != null && Number(req.body.familyInfo) < 0)
      throw new ApiError(400, "familyInfo must be >= 0");

    const updated = await service.update(req.params.id, req.body);
    if (!updated) throw new ApiError(404, "Employee not found");
    res.json({ success: true, data: updated });
  } catch (e) {
    next(e);
  }
}

// Controller cho việc xóa nhân viên
async function deleteEmployee(req, res, next) {
  try {
    const ok = await service.remove(req.params.id);
    if (!ok) throw new ApiError(404, "Employee not found");
    res.json({ success: true, message: "Deleted" });
  } catch (e) {
    next(e);
  }
}

// Export các controller hàm
module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
