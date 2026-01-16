// src/middlewares/errorHandler.js - Xử lý lỗi tập trung
/**
 * Error handler middleware
 * Xử lý tất cả các lỗi từ routes và controllers
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Lỗi validation
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors: err.errors
    });
  }

  // Lỗi database
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({
      success: false,
      message: 'Dữ liệu đã tồn tại trong hệ thống'
    });
  }

  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu tham chiếu không tồn tại'
    });
  }

  // Lỗi JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token không hợp lệ'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token đã hết hạn'
    });
  }

  // Lỗi mặc định
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Lỗi server không xác định';

  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

/**
 * Custom error class
 */
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
  }
}