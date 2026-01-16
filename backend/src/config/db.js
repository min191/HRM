// src/config/db.js - Cấu hình kết nối MySQL
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Tạo connection pool để tối ưu hiệu suất
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hrms_database',
  waitForConnections: true,
  connectionLimit: 10, // Số kết nối tối đa
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Test kết nối database
pool.getConnection()
  .then(connection => {
    console.log('✅ Kết nối database thành công!');
    connection.release();
  })
  .catch(err => {
    console.error('❌ Lỗi kết nối database:', err.message);
    process.exit(1);
  });

// Helper function để thực thi query
export const query = async (sql, params = []) => {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
};

// Helper function để thực thi transaction
export const transaction = async (callback) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export default pool;