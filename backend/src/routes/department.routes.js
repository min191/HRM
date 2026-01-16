// src/routes/department.routes.js - Department routes
import express from 'express';
import * as departmentController from '../controllers/department.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { validateDepartment, validateId } from '../middlewares/validator.js';

const router = express.Router();

/**
 * GET /api/departments
 * Lấy danh sách phòng ban (cần token)
 */
router.get('/', authenticate, departmentController.getDepartments);

/**
 * GET /api/departments/:id
 * Lấy chi tiết phòng ban (cần token)
 */
router.get('/:id', authenticate, validateId, departmentController.getDepartmentById);

/**
 * POST /api/departments
 * Tạo phòng ban mới (ADMIN only)
 */
router.post(
  '/',
  authenticate,
  requireAdmin,
  validateDepartment,
  departmentController.createDepartment
);

/**
 * PUT /api/departments/:id
 * Cập nhật phòng ban (ADMIN only)
 */
router.put(
  '/:id',
  authenticate,
  requireAdmin,
  validateId,
  validateDepartment,
  departmentController.updateDepartment
);

/**
 * DELETE /api/departments/:id
 * Xóa phòng ban (ADMIN only)
 */
router.delete(
  '/:id',
  authenticate,
  requireAdmin,
  validateId,
  departmentController.deleteDepartment
);

export default router;