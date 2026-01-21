// src/middleware/requirePermission.js
const ApiError = require("../utils/ApiError");

module.exports = (permissionCode) => {
  return (req, res, next) => {
    const user = req.user; // Lấy thông tin người dùng từ `req.user` (đã được gán trong `requireAuth`)

    if (!user) return next(new ApiError(401, "Unauthenticated")); // Nếu không có user (chưa đăng nhập)

    // Kiểm tra quyền của người dùng
    const perms = user.permissions || [];
    if (!perms.includes(permissionCode)) {
      return next(new ApiError(403, `Forbidden: missing permission ${permissionCode}`)); // Nếu không có quyền yêu cầu
    }

    next(); // Người dùng có quyền, tiếp tục
  };
};
