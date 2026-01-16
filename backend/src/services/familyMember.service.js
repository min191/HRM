import pool from '../config/db.js';

export const create = async (data) => {
  const [result] = await pool.query(
    `INSERT INTO familymembers (employeeId, name, relationship)
     VALUES (?, ?, ?)`,
    [data.employeeId, data.name, data.relationship]
  );
  return { id: result.insertId };
};
