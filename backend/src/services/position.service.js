import pool from '../config/db.js';

export const getAll = async () => {
  const [rows] = await pool.query('SELECT * FROM positions');
  return rows;
};

export const create = async (data) => {
  const [result] = await pool.query(
    'INSERT INTO positions (positionCode, positionName) VALUES (?, ?)',
    [data.positionCode, data.positionName]
  );
  return { id: result.insertId };
};
