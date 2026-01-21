const ApiError = require("../utils/ApiError");
const service = require("../services/permissions.service");

module.exports = {
  async listPermissions(req, res, next) {
    try {
      const data = await service.listPermissions();
      res.json({ success: true, data });
    } catch (e) { next(e); }
  },

  async getRolePermissions(req, res, next) {
    try {
      const role = req.params.role;
      const data = await service.getRolePermissions(role);
      res.json({ success: true, data });
    } catch (e) { next(e); }
  },

  async setRolePermissions(req, res, next) {
    try {
      const role = req.params.role;
      const items = req.body?.items;
      if (!Array.isArray(items)) throw new ApiError(400, "items must be array: [{ code, allow }]");

      const data = await service.setRolePermissions(role, items);
      res.json({ success: true, data });
    } catch (e) { next(e); }
  }
};
