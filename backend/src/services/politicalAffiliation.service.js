const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

module.exports = {
  async list(query, user) {
    const params = [];
    let where = "WHERE 1=1";

    if (query.employeeId) {
      where += " AND p.employeeId = ?";
      params.push(query.employeeId);
    }

    if (user.role === "EMPLOYEE") {
      where += " AND p.employeeId = ?";
      params.push(user.employeeId);
    }

    try {
      const [rows] = await pool.query(
        `
        SELECT p.*, e.employeeCode, e.name AS employeeName
        FROM PoliticalAffiliation p
        JOIN Employees e ON e.id = p.employeeId
        ${where}
        ORDER BY p.id DESC
        `,
        params
      );
      return rows;
    } catch (err) {
      throw new ApiError(500, "Database error while fetching political affiliations.");
    }
  },

  async getById(id, user) {
    try {
      const [rows] = await pool.query(
        `
        SELECT p.*, e.employeeCode, e.name AS employeeName
        FROM PoliticalAffiliation p
        JOIN Employees e ON e.id = p.employeeId
        WHERE p.id = ?
        `,
        [id]
      );

      const row = rows[0];
      if (!row) return null;

      if (user.role === "EMPLOYEE" && user.employeeId !== row.employeeId) {
        throw new ApiError(403, "Forbidden");
      }

      return row;
    } catch (err) {
      throw new ApiError(500, "Database error while fetching political affiliation.");
    }
  },

  async create(body, user) {
    const createdAt = new Date();

    try {
      const [result] = await pool.query(
        `
        INSERT INTO PoliticalAffiliation
        (employeeId, youthUnionMembershipDate, partyMembershipDate, partyStatus, policyRemarks, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          body.employeeId,
          body.youthUnionMembershipDate,
          body.partyMembershipDate,
          body.partyStatus,
          body.policyRemarks,
          createdAt,
          createdAt,
        ]
      );

      return this.getById(result.insertId, user);
    } catch (err) {
      throw new ApiError(500, "Failed to create political affiliation.");
    }
  },

  async update(id, body, user) {
    const current = await this.getById(id, user);

    if (!current) {
      throw new ApiError(404, "Political affiliation not found.");
    }

    if (user.role === "EMPLOYEE" && current.employeeId !== user.employeeId) {
      throw new ApiError(403, "Forbidden");
    }

    const updatedAt = new Date();
    try {
      await pool.query(
        `
        UPDATE PoliticalAffiliation
        SET youthUnionMembershipDate = ?,
            partyMembershipDate = ?,
            partyStatus = ?,
            policyRemarks = ?,
            updated_at = ?
        WHERE id = ?
        `,
        [
          body.youthUnionMembershipDate ?? current.youthUnionMembershipDate,
          body.partyMembershipDate ?? current.partyMembershipDate,
          body.partyStatus ?? current.partyStatus,
          body.policyRemarks ?? current.policyRemarks,
          updatedAt,
          id,
        ]
      );

      return this.getById(id, user);
    } catch (err) {
      throw new ApiError(500, "Failed to update political affiliation.");
    }
  },

  async remove(id, user) {
    const current = await this.getById(id, user);

    if (!current) {
      throw new ApiError(404, "Political affiliation not found.");
    }

    if (user.role === "EMPLOYEE" && current.employeeId !== user.employeeId) {
      throw new ApiError(403, "Forbidden");
    }

    try {
      const [result] = await pool.query("DELETE FROM PoliticalAffiliation WHERE id = ?", [id]);
      return result.affectedRows > 0;
    } catch (err) {
      throw new ApiError(500, "Failed to delete political affiliation.");
    }
  },
};
