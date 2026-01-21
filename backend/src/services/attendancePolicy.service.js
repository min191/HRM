const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

const allowedSort = new Set(["id", "name", "created_at"]);

function buildWhere(q, params) {
  const where = [];
  if (q.search) {
    where.push("(name LIKE ?)");
    params.push(`%${q.search}%`);
  }
  return where.length ? `WHERE ${where.join(" AND ")}` : "";
}

module.exports = {
  async list(q) {
    const page = Math.max(1, Number(q.page || 1));
    const limit = Math.min(100, Math.max(1, Number(q.limit || 10)));
    const offset = (page - 1) * limit;

    const sortBy = allowedSort.has(q.sortBy) ? q.sortBy : "id";
    const sortDir = String(q.sortDir || "DESC").toUpperCase() === "ASC" ? "ASC" : "DESC";

    const params = [];
    const whereSql = buildWhere(q, params);

    const [countRows] = await pool.query(
      `SELECT COUNT(*) as total FROM AttendancePolicy ${whereSql}`,
      params
    );
    const total = countRows[0].total;

    const [rows] = await pool.query(
      `SELECT id, name, checkInStart, checkInEnd, checkOutStart, checkOutEnd, autoCheckOutAt,
              standardMinutes, created_at, updated_at
       FROM AttendancePolicy
       ${whereSql}
       ORDER BY ${sortBy} ${sortDir}
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    return {
      data: rows,
      paging: { page, limit, total, totalPages: Math.ceil(total / limit) }
    };
  },

  async getById(id) {
    const [rows] = await pool.query(
      `SELECT id, name, checkInStart, checkInEnd, checkOutStart, checkOutEnd, autoCheckOutAt,
              standardMinutes, created_at, updated_at
       FROM AttendancePolicy WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(body) {
    const now = new Date();

    const payload = {
      name: body.name,
      checkInStart: body.checkInStart,
      checkInEnd: body.checkInEnd,
      checkOutStart: body.checkOutStart ?? null,
      checkOutEnd: body.checkOutEnd ?? null,
      autoCheckOutAt: body.autoCheckOutAt,
      standardMinutes: body.standardMinutes ?? 480,
      created_at: now,
      updated_at: now
    };

    const cols = Object.keys(payload);
    const placeholders = cols.map(() => "?").join(",");
    const values = Object.values(payload);

    const [result] = await pool.query(
      `INSERT INTO AttendancePolicy (${cols.join(",")}) VALUES (${placeholders})`,
      values
    );

    return this.getById(result.insertId);
  },

  async update(id, body) {
    const current = await this.getById(id);
    if (!current) return null;

    const now = new Date();

    const patch = {
      name: body.name ?? current.name,
      checkInStart: body.checkInStart ?? current.checkInStart,
      checkInEnd: body.checkInEnd ?? current.checkInEnd,
      checkOutStart: body.checkOutStart !== undefined ? (body.checkOutStart ?? null) : current.checkOutStart,
      checkOutEnd: body.checkOutEnd !== undefined ? (body.checkOutEnd ?? null) : current.checkOutEnd,
      autoCheckOutAt: body.autoCheckOutAt ?? current.autoCheckOutAt,
      standardMinutes: body.standardMinutes !== undefined ? Number(body.standardMinutes) : current.standardMinutes,
      updated_at: now
    };

    const cols = Object.keys(patch);
    const sets = cols.map((c) => `${c} = ?`).join(", ");
    const values = [...Object.values(patch), id];

    await pool.query(`UPDATE AttendancePolicy SET ${sets} WHERE id = ?`, values);

    return this.getById(id);
  },

  async remove(id) {
    try {
      const [result] = await pool.query("DELETE FROM AttendancePolicy WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (e) {
      if (e && e.code === "ER_ROW_IS_REFERENCED_2") {
        throw new ApiError(409, "Cannot delete: policy is referenced by Employees or other records");
      }
      throw e;
    }
  }
};
