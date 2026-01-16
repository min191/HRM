// src/routes/auth.routes.js - Authentication routes
import express from 'express';
import * as authController from '../controllers/auth.controller.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { validateLogin } from '../middlewares/validator.js';

const router = express.Router();

/**
 * POST /api/auth/login
 * Đăng nhập (public)
 */
router.post('/login', validateLogin, authController.login);

/**
 * POST /api/auth/logout
 * Đăng xuất (cần token)
 */
router.post('/logout', authenticate, authController.logout);

/**
 * GET /api/auth/me
 * Lấy thông tin user hiện tại (cần token)
 */
router.get('/me', authenticate, authController.getCurrentUser);

/**
 * POST /api/auth/change-password
 * Đổi mật khẩu (cần token)
 */
router.post('/change-password', authenticate, authController.changePassword);

/**
 * POST /api/auth/register
 * Tạo tài khoản mới (ADMIN only)
 */
router.post('/register', authenticate, requireAdmin, authController.createAccount);

export default router;