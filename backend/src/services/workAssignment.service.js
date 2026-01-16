import pool from '../config/db.js';

export const create = async (data) => {
  const [result] = await pool.query(
    `INSERT INTO workassignments (employeeId, taskName, deadline, status)
     VALUES (?, ?, ?, 'NEW')`,
    [data.employeeId, data.taskName, data.deadline]
  );
  return { id: result.insertId };
};
