const ApiError = require("../utils/ApiError");
const accountsService = require("../services/accounts.service");
const { getPermissionsByRole } = require("../services/auth.service"); // Import đúng hàm getPermissionsByRole
const { signToken } = require("../utils/jwt");

module.exports = {
  async login(req, res, next) {
    try {
      const { username, password } = req.body || {};
      if (!username || !password) throw new ApiError(400, "username and password are required");

      const acc = await accountsService.verifyLogin({ username, password }); // Kiểm tra thông tin đăng nhập
      const permissions = await getPermissionsByRole(acc.role); // Lấy quyền từ role

      const token = signToken({
        id: acc.id,
        username: acc.username,
        role: acc.role,
        employeeId: acc.employeeId,
        permissions,
      });

      res.json({
        success: true,
        data: {
          token,
          user: {
            id: acc.id,
            username: acc.username,
            role: acc.role,
            employeeId: acc.employeeId,
            permissions,
          },
        },
      });
    } catch (e) {
      next(e); // Xử lý lỗi
    }
  },
};
