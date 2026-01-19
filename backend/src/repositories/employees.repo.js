// src/repositories/employees.repo.js
const { query, queryOne } = require("./base.repo");

async function listEmployees({ q, limit, offset }) {
  const params = [];
  let where = "";

  if (q) {
    where =
      "WHERE employeeCode LIKE ? OR name LIKE ? OR email LIKE ? OR phone LIKE ?";
    params.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
  }

  const data = await query(
    `SELECT * FROM employees ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  // total count (for pagination)
  const totalRow = await queryOne(
    `SELECT COUNT(*) AS total FROM employees ${where}`,
    params
  );

  return { data, total: Number(totalRow?.total || 0) };
}

async function getEmployeeById(id) {
  return await queryOne("SELECT * FROM employees WHERE id = ?", [id]);
}

async function createEmployee(payload) {
  const keys = Object.keys(payload);
  const cols = keys.map((k) => `\`${k}\``).join(", ");
  const placeholders = keys.map(() => "?").join(", ");
  const values = keys.map((k) => payload[k]);

  const result = await query(
    `INSERT INTO employees (${cols}) VALUES (${placeholders})`,
    values
  );
  // mysql2: query() trả rows, insertId nằm trong object result[0]? -> dùng pool.execute mới chuẩn
  // để ổn định: gọi queryOne bằng LAST_INSERT_ID()
  const created = await queryOne(
    "SELECT * FROM employees WHERE id = LAST_INSERT_ID()"
  );
  return created;
}

async function updateEmployee(id, payload) {
  const keys = Object.keys(payload);
  if (keys.length === 0) return await getEmployeeById(id);

  const setClause = keys.map((k) => `\`${k}\` = ?`).join(", ");
  const values = keys.map((k) => payload[k]);

  await query(`UPDATE employees SET ${setClause} WHERE id = ?`, [...values, id]);
  return await getEmployeeById(id);
}

async function deleteEmployee(id) {
  // DELETE thật (FK có thể fail)
  await query("DELETE FROM employees WHERE id = ?", [id]);
  return true;
}

module.exports = {
  listEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};      