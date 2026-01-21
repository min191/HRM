const pool = require("../config/db");  // Dùng pool để truy vấn DB
const ApiError = require("../utils/ApiError");

module.exports = {
  // API để lấy danh sách FamilyMembers
  async list(query, user) {
    const params = [];
    let where = "WHERE 1=1";

    if (query.employeeId) {
      where += " AND f.employeeId = ?";
      params.push(query.employeeId);
    }

    if (user.role === "EMPLOYEE") {
      where += " AND f.employeeId = ?";
      params.push(user.employeeId);
    }

    const [rows] = await pool.query(
      `
      SELECT f.*, e.employeeCode, e.name AS employeeName
      FROM FamilyMembers f
      JOIN Employees e ON e.id = f.employeeId
      ${where}
      ORDER BY f.id DESC
      `,
      params
    );

    return rows;
  },

  // API để lấy FamilyMember theo ID
  async getById(id, user) {
    const [rows] = await pool.query(
      `
      SELECT f.*, e.employeeCode, e.name AS employeeName
      FROM FamilyMembers f
      JOIN Employees e ON e.id = f.employeeId
      WHERE f.id = ?
      `,
      [id]
    );

    const row = rows[0];
    if (!row) return null;

    if (user.role === "EMPLOYEE" && user.employeeId !== row.employeeId) {
      throw new ApiError(403, "Forbidden");
    }

    return row;
  },

  // API để tạo FamilyMember
  async create(body, user) {
    const createdAt = new Date();

    const [result] = await pool.query(
      `
      INSERT INTO FamilyMembers
      (employeeId, name, relationship, birthDate, occupation, notes, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        body.employeeId,
        body.name,
        body.relationship,
        body.birthDate,
        body.occupation,
        body.notes,
        createdAt,
        createdAt,
      ]
    );

    return this.getById(result.insertId, user);
  },

  // API để cập nhật FamilyMember
  async update(id, body, user) {
    const current = await this.getById(id, user);

    if (user.role === "EMPLOYEE" && current.employeeId !== user.employeeId) {
      throw new ApiError(403, "Forbidden");
    }

    const updatedAt = new Date();
    await pool.query(
      `
      UPDATE FamilyMembers
      SET name = ?,
          relationship = ?,
          birthDate = ?,
          occupation = ?,
          notes = ?,
          updated_at = ?
      WHERE id = ?
      `,
      [
        body.name ?? current.name,
        body.relationship ?? current.relationship,
        body.birthDate ?? current.birthDate,
        body.occupation ?? current.occupation,
        body.notes ?? current.notes,
        updatedAt,
        id,
      ]
    );

    return this.getById(id, user);
  },

  // API để xóa FamilyMember
  async remove(id, user) {
    const current = await this.getById(id, user);

    if (user.role === "EMPLOYEE" && current.employeeId !== user.employeeId) {
      throw new ApiError(403, "Forbidden");
    }

    const [result] = await pool.query("DELETE FROM FamilyMembers WHERE id = ?", [id]);
    return result.affectedRows > 0;
  },
};
