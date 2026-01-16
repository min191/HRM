// src/controllers/employee.controller.js - Employee controller
import * as employeeService from '../services/employee.service.js';

/**
 * GET /api/employees
 * Lấy danh sách nhân viên
 */
export const getAllEmployees = async (req, res, next) => {
  try {
    const filters = {
      status: req.query.status,
      employeeType: req.query.employeeType,
      search: req.query.search
    };

    const employees = await employeeService.getAllEmployees(filters);

    res.json({
      success: true,
      data: employees
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/employees/:id
 * Lấy chi tiết nhân viên
 */
export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeById(req.params.id);

    res.json({
      success: true,
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/employees
 * Tạo nhân viên mới (ADMIN only)
 */
export const createEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: 'Tạo nhân viên thành công',
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/employees/:id
 * Cập nhật nhân viên (ADMIN only)
 */
export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(req.params.id, req.body);

    res.json({
      success: true,
      message: 'Cập nhật nhân viên thành công',
      data: employee
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/employees/:id
 * Xóa nhân viên (ADMIN only)
 */
export const deleteEmployee = async (req, res, next) => {
  try {
    await employeeService.deleteEmployee(req.params.id);

    res.json({
      success: true,
      message: 'Xóa nhân viên thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/employees/:id/work-history
 * Lấy lịch sử công tác
 */
export const getWorkHistory = async (req, res, next) => {
  try {
    const history = await employeeService.getWorkHistory(req.params.id);

    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/employees/:id/work-history
 * Thêm lịch sử công tác (ADMIN only)
 */
export const addWorkHistory = async (req, res, next) => {
  try {
    const workHistory = await employeeService.addWorkHistory({
      ...req.body,
      employeeId: req.params.id
    });

    res.status(201).json({
      success: true,
      message: 'Thêm lịch sử công tác thành công',
      data: workHistory
    });
  } catch (error) {
    next(error);
  }
};