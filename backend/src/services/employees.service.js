const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

const allowedSort = new Set(["id", "name", "employeeCode", "department", "createdAt"]);

function buildWhere(q, params) {
  const where = [];

  if (q.search) {
    where.push("(name LIKE ? OR employeeCode LIKE ? OR phone LIKE ? OR email LIKE ?)");
    const like = `%${q.search}%`;
    params.push(like, like, like, like);
  }

  if (q.department) { where.push("department = ?"); params.push(q.department); }
  if (q.status) { where.push("status = ?"); params.push(q.status); }
  if (q.workStatus) { where.push("workStatus = ?"); params.push(q.workStatus); }
  if (q.contractType) { where.push("contractType = ?"); params.push(q.contractType); }

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
      `SELECT COUNT(*) as total FROM Employees ${whereSql}`,
      params
    );
    const total = countRows[0].total;

    const [rows] = await pool.query(
      `SELECT *
       FROM Employees
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
    const [rows] = await pool.query("SELECT * FROM Employees WHERE id = ?", [id]);
    return rows[0] || null;
  },

  async create(body) {
    // enforce unique employeeCode
    const [exists] = await pool.query(
      "SELECT id FROM Employees WHERE employeeCode = ? LIMIT 1",
      [body.employeeCode]
    );
    if (exists.length) throw new ApiError(409, "employeeCode already exists");

    const now = new Date();

    const payload = {
      employeeCode: body.employeeCode,
      name: body.name,
      title: body.title ?? null,
      position: body.position ?? null,
      department: body.department ?? null,
      status: body.status ?? null,
      dob: body.dob ?? null,
      gender: body.gender ?? null,
      address: body.address ?? null,
      phone: body.phone ?? null,
      email: body.email ?? null,
      education: body.education ?? null,

      politicalStatus: body.politicalStatus ?? null,
      politicalPartyDate: body.politicalPartyDate ?? null,
      youthUnionMember: body.youthUnionMember ?? false,
      youthUnionDate: body.youthUnionDate ?? null,
      policyStatus: body.policyStatus ?? null,

      contractType: body.contractType ?? null,
      startDate: body.startDate ?? null,
      endDate: body.endDate ?? null,
      workStatus: body.workStatus ?? null,

      familyInfo: body.familyInfo ?? 0,
      policyId: body.policyId ?? null,

      createdAt: now,
      updatedAt: now
    };

    const columns = Object.keys(payload);
    const values = Object.values(payload);
    const placeholders = columns.map(() => "?").join(",");

    const [result] = await pool.query(
      `INSERT INTO Employees (${columns.join(",")}) VALUES (${placeholders})`,
      values
    );

    return this.getById(result.insertId);
  },

  async update(id, body) {
    const current = await this.getById(id);
    if (!current) return null;

    // nếu user đổi employeeCode thì check unique
    if (body.employeeCode && body.employeeCode !== current.employeeCode) {
      const [exists] = await pool.query(
        "SELECT id FROM Employees WHERE employeeCode = ? LIMIT 1",
        [body.employeeCode]
      );
      if (exists.length) throw new ApiError(409, "employeeCode already exists");
    }

    const patch = {
      employeeCode: body.employeeCode ?? current.employeeCode,
      name: body.name ?? current.name,
      title: body.title ?? current.title,
      position: body.position ?? current.position,
      department: body.department ?? current.department,
      status: body.status ?? current.status,
      dob: body.dob ?? current.dob,
      gender: body.gender ?? current.gender,
      address: body.address ?? current.address,
      phone: body.phone ?? current.phone,
      email: body.email ?? current.email,
      education: body.education ?? current.education,

      politicalStatus: body.politicalStatus ?? current.politicalStatus,
      politicalPartyDate: body.politicalPartyDate ?? current.politicalPartyDate,
      youthUnionMember: body.youthUnionMember ?? current.youthUnionMember,
      youthUnionDate: body.youthUnionDate ?? current.youthUnionDate,
      policyStatus: body.policyStatus ?? current.policyStatus,

      contractType: body.contractType ?? current.contractType,
      startDate: body.startDate ?? current.startDate,
      endDate: body.endDate ?? current.endDate,
      workStatus: body.workStatus ?? current.workStatus,

      familyInfo: body.familyInfo ?? current.familyInfo,
      policyId: body.policyId ?? current.policyId,

      updatedAt: new Date()
    };

    const columns = Object.keys(patch);
    const sets = columns.map((c) => `${c} = ?`).join(", ");
    const values = [...Object.values(patch), id];

    await pool.query(`UPDATE Employees SET ${sets} WHERE id = ?`, values);

    return this.getById(id);
  },

  async remove(id) {
    const [result] = await pool.query("DELETE FROM Employees WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
};
