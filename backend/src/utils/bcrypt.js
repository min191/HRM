// src/utils/bcrypt.js - Bcrypt password utilities
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Mã hóa password
 * @param {String} password - Password gốc
 * @returns {Promise<String>} Hashed password
 */
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * So sánh password với hash
 * @param {String} password - Password gốc
 * @param {String} hashedPassword - Hashed password từ database
 * @returns {Promise<Boolean>} True nếu khớp
 */
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};