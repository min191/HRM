// src/routes/employee.routes.js - Employee routes
import express from 'express';
import * as employeeController from '../controllers/employee.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { validateEmployee, validateId } from '../middlewares/validator.js';

const router = express.Router();

/**
 * GET /api/employees
 * Lấy danh sách nhân viên (cần token)
 */
router.get('/', authenticate, employeeController.getAllEmployees);

/**
 * GET /api/employees/:id
 * Lấy chi tiết nhân viên (cần token)
 */
router.get('/:id', authenticate, validateId, employeeController.getEmployeeById);

/**
 * POST /api/employees
 * Tạo nhân viên mới (ADMIN only)
 */
router.post(
  '/',
  authenticate,
  requireAdmin,
  validateEmployee,
  employeeController.createEmployee
);

/**
 * PUT /api/employees/:id
 * Cập nhật nhân viên (ADMIN only)
 */
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validateId,
  employeeController.updateEmployee
);

/**
 * DELETE /api/employees/:id
 * Xóa nhân viên (ADMIN only)
 */
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validateId,
  employeeController.deleteEmployee
);

/**
 * GET /api/employees/:id/work-history
 * Lấy lịch sử công tác (cần token)
 */
router.get(
  '/:id/work-history',
  authenticate,
  validateId,
  employeeController.getWorkHistory
);

/**
 * POST /api/employees/:id/work-history
 * Thêm lịch sử công tác (ADMIN only)
 */
router.post(
  '/:id/work-history',
  authenticate,
  requireAdmin,
  validateId,
  employeeController.addWorkHistory
);

export default router;