// src/repositories/base.repo.js
const { pool } = require("../config/db");

async function query(sql, params = []) {
  const [rows] = await pool.query(sql, params);
  return rows;
}

async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows?.[0] || null;
}

module.exports = { query, queryOne };