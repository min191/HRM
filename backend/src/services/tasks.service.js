const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

const allowedSort = new Set(["id", "taskCode", "taskName", "created_at"]);

function buildWhere(q, params) {
  const where = [];

  if (q.search) {
    where.push("(taskCode LIKE ? OR taskName LIKE ? OR description LIKE ?)");
    const like = `%${q.search}%`;
    params.push(like, like, like);
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
      `SELECT COUNT(*) as total FROM Tasks ${whereSql}`,
      params
    );
    const total = countRows[0].total;

    const [rows] = await pool.query(
      `SELECT id, taskCode, taskName, description, created_at, updated_at
       FROM Tasks
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
      `SELECT id, taskCode, taskName, description, created_at, updated_at
       FROM Tasks WHERE id = ?`,
      [id]
    );
    return rows[0] || null;
  },

  async create(body) {
    // taskCode UNIQUE (nhưng có thể NULL) => chỉ check khi có code
    if (body.taskCode) {
      const [exists] = await pool.query(
        "SELECT id FROM Tasks WHERE taskCode = ? LIMIT 1",
        [body.taskCode]
      );
      if (exists.length) throw new ApiError(409, "taskCode already exists");
    }

    const now = new Date();

    const payload = {
      taskCode: body.taskCode ?? null,
      taskName: body.taskName,
      description: body.description ?? null,
      created_at: now,
      updated_at: now
    };

    const cols = Object.keys(payload);
    const placeholders = cols.map(() => "?").join(",");
    const values = Object.values(payload);

    const [result] = await pool.query(
      `INSERT INTO Tasks (${cols.join(",")}) VALUES (${placeholders})`,
      values
    );

    return this.getById(result.insertId);
  },

  async update(id, body) {
    const current = await this.getById(id);
    if (!current) return null;

    // đổi taskCode -> check unique
    if (body.taskCode !== undefined && body.taskCode !== current.taskCode) {
      if (body.taskCode) {
        const [exists] = await pool.query(
          "SELECT id FROM Tasks WHERE taskCode = ? LIMIT 1",
          [body.taskCode]
        );
        if (exists.length) throw new ApiError(409, "taskCode already exists");
      }
    }

    const now = new Date();

    const patch = {
      taskCode: body.taskCode !== undefined ? (body.taskCode ?? null) : current.taskCode,
      taskName: body.taskName ?? current.taskName,
      description: body.description ?? current.description,
      updated_at: now
    };

    const cols = Object.keys(patch);
    const sets = cols.map((c) => `${c} = ?`).join(", ");
    const values = [...Object.values(patch), id];

    await pool.query(`UPDATE Tasks SET ${sets} WHERE id = ?`, values);

    return this.getById(id);
  },

  async remove(id) {
    try {
      const [result] = await pool.query("DELETE FROM Tasks WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (e) {
      if (e && e.code === "ER_ROW_IS_REFERENCED_2") {
        throw new ApiError(409, "Cannot delete: Task is referenced by other records");
      }
      throw e;
    }
  }
};
