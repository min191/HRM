// src/middlewares/auth.js - Middleware xác thực và phân quyền
import { verifyToken } from '../utils/jwt.js';

/**
 * Middleware xác thực JWT token
 * Kiểm tra token trong Authorization header
 */
export const authenticate = async (req, res, next) => {
  try {
    // Lấy token từ header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Token không được cung cấp'
      });
    }

    // Lấy token (bỏ "Bearer ")
    const token = authHeader.substring(7);

    // Verify token
    const decoded = verifyToken(token);

    // Gắn thông tin user vào request
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
      employeeId: decoded.employeeId
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ hoặc đã hết hạn'
    });
  }
};

/**
 * Middleware kiểm tra role ADMIN
 */
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Bạn không có quyền thực hiện thao tác này'
    });
  }
  next();
};

/**
 * Middleware kiểm tra quyền truy cập resource
 * USER chỉ được truy cập dữ liệu của chính mình
 * ADMIN được truy cập tất cả
 */
export const checkResourceOwnership = (req, res, next) => {
  const requestedEmployeeId = parseInt(req.params.employeeId || req.params.id);
  
  // ADMIN được phép truy cập tất cả
  if (req.user.role === 'ADMIN') {
    return next();
  }

  // USER chỉ được truy cập dữ liệu của chính mình
  if (req.user.employeeId !== requestedEmployeeId) {
    return res.status(403).json({
      success: false,
      message: 'Bạn chỉ được phép truy cập dữ liệu của chính mình'
    });
  }

  next();
};

/**
 * Middleware cho phép nhiều role
 * @param {Array<String>} allowedRoles - Danh sách role được phép
 */
export const requireRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không có quyền thực hiện thao tác này'
      });
    }
    next();
  };
};