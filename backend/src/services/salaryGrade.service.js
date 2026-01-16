import pool from '../config/db.js';

export const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM salarygrades');
  return rows;
};

export const create = async (data) => {
  const [result] = await pool.query(
    'INSERT INTO salarygrades (gradeName, coefficient) VALUES (?, ?)',
    [data.gradeName, data.coefficient]
  );
  return { id: result.insertId };
};
