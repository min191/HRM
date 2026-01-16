import pool from '../config/db.js';

export const mark = async (data) => {
  const [result] = await pool.query(
    'INSERT INTO dailyattendance (employeeId, date, status) VALUES (?, ?, ?)',
    [data.employeeId, data.date, data.status]
  );
  return { id: result.insertId };
};

export const getMonthly = async (employeeId, month, year) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS totalDaysWorked
     FROM dailyattendance
     WHERE employeeId = ?
     AND MONTH(date) = ?
     AND YEAR(date) = ?`,
    [employeeId, month, year]
  );
  return rows[0];
};
