const pool = require("../config/db");
const ApiError = require("../utils/ApiError");

function now() {
  return new Date();
}

function isEmployeeSelf(user, employeeId) {
  return user?.role === "EMPLOYEE" && Number(user.employeeId) === Number(employeeId);
}

module.exports = {
  // Get a list of professional qualifications
  async list(query, user) {
    const params = [];
    let where = "WHERE 1=1";

    if (query.employeeId) {
      where += " AND pq.employeeId = ?";
      params.push(query.employeeId);
    }

    if (user.role === "EMPLOYEE") {
      where += " AND pq.employeeId = ?";
      params.push(user.employeeId);
    }

    const [rows] = await pool.query(
      `
      SELECT pq.*, 
             e.employeeCode, 
             e.name AS employeeName
      FROM ProfessionalQualification pq
      JOIN Employees e ON e.id = pq.employeeId
      ${where}
      ORDER BY pq.id DESC
      `,
      params
    );

    return rows;
  },

  // Get professional qualification by ID
  async getById(id, user) {
    const [rows] = await pool.query(
      `
      SELECT pq.*, 
             e.employeeCode, 
             e.name AS employeeName
      FROM ProfessionalQualification pq
      JOIN Employees e ON e.id = pq.employeeId
      WHERE pq.id = ?
      `,
      [id]
    );

    const row = rows[0];
    if (!row) return null;

    if (isEmployeeSelf(user, row.employeeId)) {
      return row;
    } else {
      throw new ApiError(403, "Forbidden");
    }
  },

  // Create a new professional qualification
  async create(body, user) {
    const employeeId =
      user.role === "EMPLOYEE" ? user.employeeId : body.employeeId;

    if (!employeeId) throw new ApiError(400, "employeeId is required");

    const createdAt = now();

    const [result] = await pool.query(
      `
      INSERT INTO ProfessionalQualification
      (employeeId, degree, fieldOfStudy, educationLevel, institution,
       graduationYear, foreignLanguageProficiency, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        employeeId,
        body.degree,
        body.fieldOfStudy,
        body.educationLevel,
        body.institution,
        body.graduationYear,
        body.foreignLanguageProficiency,
        createdAt,
        createdAt,
      ]
    );

    return this.getById(result.insertId, user);
  },

  // Update a professional qualification
  async update(id, body, user) {
    const current = await this.getById(id, user);
    if (!current) return null;

    if (user.role === "EMPLOYEE" && !isEmployeeSelf(user, current.employeeId)) {
      throw new ApiError(403, "Forbidden");
    }

    const updatedAt = now();

    await pool.query(
      `
      UPDATE ProfessionalQualification
      SET degree = ?,
          fieldOfStudy = ?,
          educationLevel = ?,
          institution = ?,
          graduationYear = ?,
          foreignLanguageProficiency = ?,
          updated_at = ?
      WHERE id = ?
      `,
      [
        body.degree ?? current.degree,
        body.fieldOfStudy ?? current.fieldOfStudy,
        body.educationLevel ?? current.educationLevel,
        body.institution ?? current.institution,
        body.graduationYear ?? current.graduationYear,
        body.foreignLanguageProficiency ?? current.foreignLanguageProficiency,
        updatedAt,
        id,
      ]
    );

    return this.getById(id, user);
  },

  // Remove a professional qualification
  async remove(id, user) {
    const current = await this.getById(id, user);
    if (!current) return false;

    if (user.role === "EMPLOYEE" && !isEmployeeSelf(user, current.employeeId)) {
      throw new ApiError(403, "Forbidden");
    }

    const [rs] = await pool.query(
      "DELETE FROM ProfessionalQualification WHERE id = ?",
      [id]
    );

    return rs.affectedRows > 0;
  },
};
