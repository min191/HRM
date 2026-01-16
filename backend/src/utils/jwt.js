// src/utils/jwt.js - JWT token utilities
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Tạo JWT token
 * @param {Object} payload - Dữ liệu muốn mã hóa (user id, role, etc.)
 * @returns {String} JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

/**
 * Verify và decode JWT token
 * @param {String} token - JWT token
 * @returns {Object} Decoded payload
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Token không hợp lệ hoặc đã hết hạn');
  }
};

/**
 * Decode token không verify (dùng để debug)
 * @param {String} token
 * @returns {Object} Decoded payload
 */
export const decodeToken = (token) => {
  return jwt.decode(token);
};