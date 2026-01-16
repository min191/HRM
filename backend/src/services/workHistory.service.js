import pool from '../config/db.js';

export const create = async (data) => {
  const [result] = await pool.query(
    `INSERT INTO workhistory (employeeId, departmentId, positionId, effectiveDate)
     VALUES (?, ?, ?, ?)`,
    [data.employeeId, data.departmentId, data.positionId, data.effectiveDate]
  );
  return { id: result.insertId };
};

export const getByEmployee = async (employeeId) => {
  const [rows] = await pool.query(
    'SELECT * FROM workhistory WHERE employeeId = ?',
    [employeeId]
  );
  return rows;
};
