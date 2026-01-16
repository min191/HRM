// src/controllers/auth.controller.js - Authentication controller
import * as authService from '../services/auth.service.js';

/**
 * POST /api/auth/login
 * Đăng nhập
 */
export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await authService.login(username, password);

    res.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/logout
 * Đăng xuất (client xóa token)
 */
export const logout = async (req, res, next) => {
  try {
    // Với JWT, logout được xử lý ở phía client
    // Client sẽ xóa token khỏi localStorage/sessionStorage
    
    res.json({
      success: true,
      message: 'Đăng xuất thành công'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/auth/me
 * Lấy thông tin user hiện tại
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await authService.getCurrentUser(req.user.id);

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/change-password
 * Đổi mật khẩu
 */
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng cung cấp đầy đủ thông tin'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Mật khẩu mới phải có ít nhất 6 ký tự'
      });
    }

    const result = await authService.changePassword(
      req.user.id,
      oldPassword,
      newPassword
    );

    res.json({
      success: true,
      message: result.message
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/auth/register (ADMIN only)
 * Tạo tài khoản mới
 */
export const createAccount = async (req, res, next) => {
  try {
    const account = await authService.createAccount(req.body);

    res.status(201).json({
      success: true,
      message: 'Tạo tài khoản thành công',
      data: account
    });
  } catch (error) {
    next(error);
  }
};