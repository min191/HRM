const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

const STATUS = {
  PENDING: "Pending",
  SUBMITTED: "Submitted",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};
function safeJson(value) {
  if (value == null) return [];

  // mysql2 có thể trả object/array JSON sẵn
  if (Array.isArray(value)) return value;
  if (typeof value === "object") return value; // object

  // Buffer -> string
  if (Buffer.isBuffer(value)) value = value.toString("utf8");

  // string -> parse an toàn
  if (typeof value === "string") {
    const s = value.trim();
    if (!s) return [];
    try {
      return JSON.parse(s);
    } catch (err) {
      return []; // không cho server chết
    }
  }

  return [];
}


function now() {
  return new Date();
}

function pushHistory(history, event) {
  const arr = Array.isArray(history) ? [...history] : [];
  arr.push(event);
  return arr;
}


// scope rule: EMPLOYEE chỉ được xem/tác động record của chính mình
function isEmployeeSelf(user, employeeId) {
  return user?.role === "EMPLOYEE" && Number(user.employeeId) === Number(employeeId);
}

module.exports = {
  async list(query, user) {
    const params = [];
    let where = "WHERE 1=1";

    // filter
    if (query.type) {
      where += " AND a.type = ?";
      params.push(query.type);
    }
    if (query.status) {
      where += " AND a.status = ?";
      params.push(query.status);
    }
    if (query.employeeId) {
      where += " AND a.employeeId = ?";
      params.push(query.employeeId);
    }

    // self-scope for EMPLOYEE
    if (user.role === "EMPLOYEE") {
      where += " AND a.employeeId = ?";
      params.push(user.employeeId);
    }

    const [rows] = await pool.query(
      `
      SELECT a.*,
             e.employeeCode,
             e.name AS employeeName
      FROM Approvals a
      JOIN Employees e ON e.id = a.employeeId
      ${where}
      ORDER BY a.id DESC
      `,
      params
    );

    return rows.map((r) => ({
      ...r,
      history: safeJson(r.history),

    }));
  },

  async getById(id, user) {
    const [rows] = await pool.query(
      `
      SELECT a.*,
             e.employeeCode,
             e.name AS employeeName
      FROM Approvals a
      JOIN Employees e ON e.id = a.employeeId
      WHERE a.id = ?
      `,
      [id]
    );

    const row = rows[0];
    if (!row) return null;

    if (user.role === "EMPLOYEE" && !isEmployeeSelf(user, row.employeeId)) {
      throw new ApiError(403, "Forbidden");
    }

    return { ...row, history: safeJson(row.history) };

  },

  async create(body, user) {
    // EMPLOYEE tạo cho chính mình; HR/ADMIN có thể tạo cho người khác (nếu bạn muốn)
    const employeeId =
      user.role === "EMPLOYEE" ? user.employeeId : (body.employeeId ?? user.employeeId);

    if (!employeeId) throw new ApiError(400, "employeeId is required");

    const createdAt = now();

    const history = [
      {
        at: createdAt.toISOString(),
        by: user.id,
        role: user.role,
        action: "CREATE",
        note: "Created",
      },
    ];

    const [result] = await pool.query(
      `
      INSERT INTO Approvals
      (employeeId, type, reason, startDate, endDate, status, createdAt, history, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        employeeId,
        body.type,
        body.reason,
        body.startDate,
        body.endDate,
        STATUS.PENDING,
        createdAt,
        JSON.stringify(history),
        createdAt,
        createdAt,
      ]
    );

    return this.getById(result.insertId, user);
  },

  async update(id, body, user) {
    const current = await this.getById(id, user);

    if (![STATUS.PENDING].includes(current.status)) {
      throw new ApiError(400, "Only Pending approvals can be updated");
    }

    // EMPLOYEE chỉ update của mình
    if (user.role === "EMPLOYEE" && !isEmployeeSelf(user, current.employeeId)) {
      throw new ApiError(403, "Forbidden");
    }

    const updatedAt = now();
    const history = pushHistory(current.history, {
      at: updatedAt.toISOString(),
      by: user.id,
      role: user.role,
      action: "UPDATE",
      note: body.note || "Updated fields",
    });

    await pool.query(
      `
      UPDATE Approvals
      SET type = ?,
          reason = ?,
          startDate = ?,
          endDate = ?,
          history = ?,
          updated_at = ?
      WHERE id = ?
      `,
      [
        body.type ?? current.type,
        body.reason ?? current.reason,
        body.startDate ?? current.startDate,
        body.endDate ?? current.endDate,
        JSON.stringify(history),
        updatedAt,
        id,
      ]
    );

    return this.getById(id, user);
  },

  async remove(id, user) {
    const current = await this.getById(id, user);

    if (![STATUS.PENDING].includes(current.status)) {
      throw new ApiError(400, "Only Pending approvals can be deleted");
    }

    // EMPLOYEE chỉ delete của mình
    if (user.role === "EMPLOYEE" && !isEmployeeSelf(user, current.employeeId)) {
      throw new ApiError(403, "Forbidden");
    }

    const [result] = await pool.query("DELETE FROM Approvals WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },

  async submit(id, user) {
    const current = await this.getById(id, user);

    if (current.status !== STATUS.PENDING) {
      throw new ApiError(400, "Only Pending approvals can be submitted");
    }

    if (user.role === "EMPLOYEE" && !isEmployeeSelf(user, current.employeeId)) {
      throw new ApiError(403, "Forbidden");
    }

    const updatedAt = now();
    const history = pushHistory(current.history, {
      at: updatedAt.toISOString(),
      by: user.id,
      role: user.role,
      action: "SUBMIT",
      note: "Submitted for approval",
    });

    await pool.query(
      `
      UPDATE Approvals
      SET status = ?,
          history = ?,
          updated_at = ?
      WHERE id = ?
      `,
      [STATUS.SUBMITTED, JSON.stringify(history), updatedAt, id]
    );

    return this.getById(id, user);
  },

  async approve(id, body, user) {
    const current = await this.getById(id, user);

    if (current.status !== STATUS.SUBMITTED) {
      throw new ApiError(400, "Only Submitted approvals can be approved");
    }

    const updatedAt = now();
    const history = pushHistory(current.history, {
      at: updatedAt.toISOString(),
      by: user.id,
      role: user.role,
      action: "APPROVE",
      note: body?.note || "Approved",
    });

    await pool.query(
      `
      UPDATE Approvals
      SET status = ?,
          history = ?,
          updated_at = ?
      WHERE id = ?
      `,
      [STATUS.APPROVED, JSON.stringify(history), updatedAt, id]
    );

    return this.getById(id, user);
  },

  async reject(id, body, user) {
    const current = await this.getById(id, user);

    if (current.status !== STATUS.SUBMITTED) {
      throw new ApiError(400, "Only Submitted approvals can be rejected");
    }

    const updatedAt = now();
    const history = pushHistory(current.history, {
      at: updatedAt.toISOString(),
      by: user.id,
      role: user.role,
      action: "REJECT",
      note: body?.note || "Rejected",
    });

    await pool.query(
      `
      UPDATE Approvals
      SET status = ?,
          history = ?,
          updated_at = ?
      WHERE id = ?
      `,
      [STATUS.REJECTED, JSON.stringify(history), updatedAt, id]
    );

    return this.getById(id, user);
  },
};
