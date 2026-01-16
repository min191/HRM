// src/services/auth.service.js - Authentication service
import { query } from '../config/db.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';
import { AppError } from '../middlewares/errorHandler.js';

/**
 * Đăng nhập
 */
export const login = async (username, password) => {
  // Tìm account theo username
  const sql = `
    SELECT 
      a.id, 
      a.username, 
      a.password, 
      a.role, 
      a.status,
      a.employeeId,
      e.fullName,
      e.email
    FROM accounts a
    LEFT JOIN employee e ON a.employeeId = e.id
    WHERE a.username = ?
  `;

  const accounts = await query(sql, [username]);

  if (accounts.length === 0) {
    throw new AppError('Tên đăng nhập hoặc mật khẩu không đúng', 401);
  }

  const account = accounts[0];

  // Kiểm tra trạng thái tài khoản
  if (account.status !== 'ACTIVE') {
    throw new AppError('Tài khoản đã bị khóa', 403);
  }

  // So sánh password
  const isPasswordValid = await comparePassword(password, account.password);

  if (!isPasswordValid) {
    throw new AppError('Tên đăng nhập hoặc mật khẩu không đúng', 401);
  }

  // Tạo JWT token
  const token = generateToken({
    id: account.id,
    username: account.username,
    role: account.role,
    employeeId: account.employeeId
  });

  // Trả về thông tin user và token
  return {
    token,
    user: {
      id: account.id,
      username: account.username,
      role: account.role,
      employeeId: account.employeeId,
      fullName: account.fullName,
      email: account.email
    }
  };
};

/**
 * Lấy thông tin user hiện tại
 */
export const getCurrentUser = async (userId) => {
  const sql = `
    SELECT 
      a.id, 
      a.username, 
      a.role, 
      a.status,
      a.employeeId,
      e.fullName,
      e.email,
      e.phone,
      e.dateOfBirth,
      e.gender
    FROM accounts a
    LEFT JOIN employee e ON a.employeeId = e.id
    WHERE a.id = ?
  `;

  const users = await query(sql, [userId]);

  if (users.length === 0) {
    throw new AppError('Không tìm thấy thông tin user', 404);
  }

  return users[0];
};

/**
 * Tạo tài khoản mới (dành cho ADMIN)
 */
export const createAccount = async (accountData) => {
  const { username, password, employeeId, role = 'USER' } = accountData;

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Insert vào database
  const sql = `
    INSERT INTO accounts (username, password, employeeId, role, status)
    VALUES (?, ?, ?, ?, 'ACTIVE')
  `;

  const result = await query(sql, [username, hashedPassword, employeeId, role]);

  return {
    id: result.insertId,
    username,
    role,
    employeeId
  };
};

/**
 * Đổi mật khẩu
 */
export const changePassword = async (userId, oldPassword, newPassword) => {
  // Lấy password hiện tại
  const accounts = await query('SELECT password FROM accounts WHERE id = ?', [userId]);

  if (accounts.length === 0) {
    throw new AppError('Không tìm thấy tài khoản', 404);
  }

  // Verify old password
  const isValid = await comparePassword(oldPassword, accounts[0].password);

  if (!isValid) {
    throw new AppError('Mật khẩu cũ không đúng', 400);
  }

  // Hash new password
  const hashedPassword = await hashPassword(newPassword);

  // Update password
  await query('UPDATE accounts SET password = ? WHERE id = ?', [hashedPassword, userId]);

  return { message: 'Đổi mật khẩu thành công' };
};