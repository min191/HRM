// src/services/employee.service.js - Employee service
import { query } from '../config/db.js';
import { AppError } from '../middlewares/errorHandler.js';

/**
 * Lấy danh sách nhân viên
 */
export const getAllEmployees = async (filters = {}) => {
  let sql = `
    SELECT 
      e.*,
      d.departmentName,
      p.positionName
    FROM employee e
    LEFT JOIN workhistory wh ON e.id = wh.employeeId 
      AND wh.effectiveDate = (
        SELECT MAX(effectiveDate) 
        FROM workhistory 
        WHERE employeeId = e.id
      )
    LEFT JOIN departments d ON wh.departmentId = d.id
    LEFT JOIN positions p ON wh.positionId = p.id
  `;

  const conditions = [];
  const params = [];

  // Filter theo status
  if (filters.status) {
    conditions.push('e.status = ?');
    params.push(filters.status);
  }

  // Filter theo employeeType
  if (filters.employeeType) {
    conditions.push('e.employeeType = ?');
    params.push(filters.employeeType);
  }

  // Search theo tên hoặc mã
  if (filters.search) {
    conditions.push('(e.fullName LIKE ? OR e.employeeCode LIKE ?)');
    params.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY e.createdAt DESC';

  return await query(sql, params);
};

/**
 * Lấy chi tiết nhân viên theo ID
 */
export const getEmployeeById = async (id) => {
  const sql = `
    SELECT 
      e.*,
      d.departmentName,
      p.positionName,
      sg.gradeName,
      sg.coefficient,
      pe.baseSalary,
      ce.contractNumber,
      ce.agreedSalary
    FROM employee e
    LEFT JOIN workhistory wh ON e.id = wh.employeeId 
      AND wh.effectiveDate = (
        SELECT MAX(effectiveDate) 
        FROM workhistory 
        WHERE employeeId = e.id
      )
    LEFT JOIN departments d ON wh.departmentId = d.id
    LEFT JOIN positions p ON wh.positionId = p.id
    LEFT JOIN permanentemployee pe ON e.id = pe.employeeId
    LEFT JOIN salarygrades sg ON pe.salaryLevelId = sg.id
    LEFT JOIN contractemployee ce ON e.id = ce.employeeId
    WHERE e.id = ?
  `;

  const employees = await query(sql, [id]);

  if (employees.length === 0) {
    throw new AppError('Không tìm thấy nhân viên', 404);
  }

  return employees[0];
};

/**
 * Tạo nhân viên mới
 */
export const createEmployee = async (employeeData) => {
  const {
    employeeCode,
    fullName,
    dateOfBirth,
    gender,
    address,
    phone,
    email,
    education,
    politicalStatus,
    employeeType,
    status = 'ACTIVE',
    startDate
  } = employeeData;

  const sql = `
    INSERT INTO employee (
      employeeCode, fullName, dateOfBirth, gender, address,
      phone, email, education, politicalStatus, employeeType,
      status, startDate
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await query(sql, [
    employeeCode, fullName, dateOfBirth, gender, address,
    phone, email, education, politicalStatus, employeeType,
    status, startDate
  ]);

  return {
    id: result.insertId,
    ...employeeData
  };
};

/**
 * Cập nhật nhân viên
 */
export const updateEmployee = async (id, employeeData) => {
  // Kiểm tra nhân viên có tồn tại không
  await getEmployeeById(id);

  const fields = [];
  const params = [];

  // Chỉ update các field được gửi lên
  Object.keys(employeeData).forEach(key => {
    if (employeeData[key] !== undefined) {
      fields.push(`${key} = ?`);
      params.push(employeeData[key]);
    }
  });

  if (fields.length === 0) {
    throw new AppError('Không có dữ liệu để cập nhật', 400);
  }

  params.push(id);

  const sql = `UPDATE employee SET ${fields.join(', ')} WHERE id = ?`;
  await query(sql, params);

  return await getEmployeeById(id);
};

/**
 * Xóa nhân viên (soft delete)
 */
export const deleteEmployee = async (id) => {
  await getEmployeeById(id);

  // Soft delete: set status = 'DELETED'
  await query('UPDATE employee SET status = ? WHERE id = ?', ['DELETED', id]);

  return { message: 'Xóa nhân viên thành công' };
};

/**
 * Lấy lịch sử công tác của nhân viên
 */
export const getWorkHistory = async (employeeId) => {
  const sql = `
    SELECT 
      wh.*,
      d.departmentName,
      p.positionName
    FROM workhistory wh
    LEFT JOIN departments d ON wh.departmentId = d.id
    LEFT JOIN positions p ON wh.positionId = p.id
    WHERE wh.employeeId = ?
    ORDER BY wh.effectiveDate DESC
  `;

  return await query(sql, [employeeId]);
};

/**
 * Thêm lịch sử công tác
 */
export const addWorkHistory = async (workHistoryData) => {
  const { employeeId, departmentId, positionId, effectiveDate } = workHistoryData;

  const sql = `
    INSERT INTO workhistory (employeeId, departmentId, positionId, effectiveDate)
    VALUES (?, ?, ?, ?)
  `;

  const result = await query(sql, [employeeId, departmentId, positionId, effectiveDate]);

  return {
    id: result.insertId,
    ...workHistoryData
  };
};