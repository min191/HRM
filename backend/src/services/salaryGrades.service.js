const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

const allowedSort = new Set(["id", "gradeName", "coefficient", "created_at"]);

function buildWhere(q, params) {
  const where = [];

  if (q.search) {
    where.push("(gradeName LIKE ? OR description LIKE ?)");
    const like = `%${q.search}%`;
    params.push(like, like);
  }

  // filter theo min/max coefficient
  if (q.minCoefficient !== undefined && q.minCoefficient !== "") {
    where.push("coefficient >= ?");
    params.push(Number(q.minCoefficient));
  }
  if (q.maxCoefficient !== undefined && q.maxCoefficient !== "") {
    where.push("coefficient <= ?");
    params.push(Number(q.maxCoefficient));
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
      `SELECT COUNT(*) as total FROM SalaryGrades ${whereSql}`,
      params
    );
    const total = countRows[0].total;

    const [rows] = await pool.query(
      `SELECT id, gradeName, coefficient, description, created_at, updated_at
       FROM SalaryGrades
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
      `SELECT id, gradeName, coefficient, description, created_at, updated_at
       FROM SalaryGrades WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(body) {
    // (tuỳ bạn) nếu muốn gradeName unique thì check ở đây
    // const [exists] = await pool.query("SELECT id FROM SalaryGrades WHERE gradeName=? LIMIT 1", [body.gradeName]);
    // if (exists.length) throw new ApiError(409, "gradeName already exists");

    const now = new Date();

    const payload = {
      gradeName: body.gradeName,
      coefficient: Number(body.coefficient),
      description: body.description ?? null,
      created_at: now,
      updated_at: now
    };

    const cols = Object.keys(payload);
    const placeholders = cols.map(() => "?").join(",");
    const values = Object.values(payload);

    const [result] = await pool.query(
      `INSERT INTO SalaryGrades (${cols.join(",")}) VALUES (${placeholders})`,
      values
    );

    return this.getById(result.insertId);
  },

  async update(id, body) {
    const current = await this.getById(id);
    if (!current) return null;

    const now = new Date();

    const patch = {
      gradeName: body.gradeName ?? current.gradeName,
      coefficient: body.coefficient !== undefined ? Number(body.coefficient) : current.coefficient,
      description: body.description ?? current.description,
      updated_at: now
    };

    const cols = Object.keys(patch);
    const sets = cols.map((c) => `${c} = ?`).join(", ");
    const values = [...Object.values(patch), id];

    await pool.query(`UPDATE SalaryGrades SET ${sets} WHERE id = ?`, values);

    return this.getById(id);
  },

  async remove(id) {
    // nếu bảng khác FK tới SalaryGrades, delete có thể bị chặn -> báo lỗi rõ
    try {
      const [result] = await pool.query("DELETE FROM SalaryGrades WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (e) {
      if (e && e.code === "ER_ROW_IS_REFERENCED_2") {
        throw new ApiError(409, "Cannot delete: SalaryGrade is being referenced by other records");
      }
      throw e;
    }
  }
};
