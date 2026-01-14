// models/employee.model.js
import { db } from "../config/db.js";

export const EmployeeModel = {
  findAll: async () => {
    const [rows] = await db.query("SELECT * FROM employee");
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM employee WHERE id = ?",
      [id]
    );
    return rows[0];
  },

  create: async (data) => {
    const [result] = await db.query(
      `INSERT INTO employee
       (employeeCode, fullName, dateOfBirth, gender, employeeType, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        data.employeeCode,
        data.fullName,
        data.dateOfBirth,
        data.gender,
        data.employeeType,
        data.status
      ]
    );
    return result.insertId;
  }
};
