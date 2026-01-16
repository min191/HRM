import * as departmentService from '../services/department.service.js';

export const getDepartments = async (req, res, next) => {
  try {
    const data = await departmentService.getAll();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
/**
 * GET /api/departments/:id
 * Lấy chi tiết phòng ban theo ID
 */
export const getDepartmentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const rows = await query(
      'SELECT * FROM departments WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy phòng ban'
      });
    }

    return res.status(200).json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('getDepartmentById error:', error);
    next(error);
  }
};

export const createDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.create(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    next(error);
  }
};

export const updateDepartment = async (req, res, next) => {
  try {
    const department = await departmentService.update(req.params.id, req.body);
    res.json({ success: true, data: department });
  } catch (error) {
    next(error);
  }
};

export const deleteDepartment = async (req, res, next) => {
  try {
    await departmentService.remove(req.params.id);
    res.json({ success: true, message: 'Xóa phòng ban thành công' });
  } catch (error) {
    next(error);
  }
};
