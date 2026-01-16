import pool from '../config/db.js';

export const getByEmployee = async (employeeId) => {
  const [rows] = await pool.query(
    'SELECT * FROM approvals WHERE employeeId = ?',
    [employeeId]
  );
  return rows;
};

export const create = async (data) => {
  const [result] = await pool.query(
    `INSERT INTO approvals
    (employeeId, type, reason, startDate, endDate, status)
     VALUES (?, ?, ?, ?, ?, 'PENDING')`,
    [data.employeeId, data.type, data.reason, data.startDate, data.endDate]
  );
  return { id: result.insertId };
};

export const updateStatus = async (id, status) => {
  await pool.query(
    'UPDATE approvals SET status = ? WHERE id = ?',
    [status, id]
  );
  return 'Cập nhật trạng thái thành công';
};
