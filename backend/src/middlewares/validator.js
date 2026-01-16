// src/middlewares/validator.js - Validation middleware
/**
 * Validate dữ liệu đăng nhập
 */
export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  const errors = [];

  if (!username || username.trim() === '') {
    errors.push('Username không được để trống');
  }

  if (!password || password.trim() === '') {
    errors.push('Password không được để trống');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors
    });
  }

  next();
};

/**
 * Validate dữ liệu tạo nhân viên
 */
export const validateEmployee = (req, res, next) => {
  const { employeeCode, fullName, email, phone } = req.body;
  const errors = [];

  if (!employeeCode || employeeCode.trim() === '') {
    errors.push('Mã nhân viên không được để trống');
  }

  if (!fullName || fullName.trim() === '') {
    errors.push('Họ tên không được để trống');
  }

  // Validate email format
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Email không đúng định dạng');
  }

  // Validate phone format (10-11 số)
  if (phone && !/^[0-9]{10,11}$/.test(phone)) {
    errors.push('Số điện thoại phải có 10-11 chữ số');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors
    });
  }

  next();
};

/**
 * Validate ID param
 */
export const validateId = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      message: 'ID không hợp lệ'
    });
  }

  next();
};

/**
 * Validate dữ liệu phòng ban
 */
export const validateDepartment = (req, res, next) => {
  const { departmentCode, departmentName } = req.body;
  const errors = [];

  if (!departmentCode || departmentCode.trim() === '') {
    errors.push('Mã phòng ban không được để trống');
  }

  if (!departmentName || departmentName.trim() === '') {
    errors.push('Tên phòng ban không được để trống');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors
    });
  }

  next();
};

/**
 * Validate dữ liệu đơn phê duyệt
 */
export const validateApproval = (req, res, next) => {
  const { employeeId, type, reason, startDate, endDate } = req.body;
  const errors = [];

  if (!employeeId || isNaN(employeeId)) {
    errors.push('ID nhân viên không hợp lệ');
  }

  if (!type || type.trim() === '') {
    errors.push('Loại đơn không được để trống');
  }

  if (!reason || reason.trim() === '') {
    errors.push('Lý do không được để trống');
  }

  if (!startDate) {
    errors.push('Ngày bắt đầu không được để trống');
  }

  if (!endDate) {
    errors.push('Ngày kết thúc không được để trống');
  }

  // Check date logic
  if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
    errors.push('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Dữ liệu không hợp lệ',
      errors
    });
  }

  next();
};