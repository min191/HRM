const familyMemberService = require("../services/familyMember.service");  // Import service để xử lý dữ liệu

module.exports = {
  // API để lấy danh sách FamilyMembers
  async list(req, res, next) {
    try {
      const data = await familyMemberService.list(req.query, req.user);  // Lấy data từ service
      res.json({ success: true, data });
    } catch (e) {
      next(e);
    }
  },

  // API để lấy FamilyMember theo ID
  async getById(req, res, next) {
    try {
      const row = await familyMemberService.getById(req.params.id, req.user);
      if (!row) throw new ApiError(404, "Not found");
      res.json({ success: true, data: row });
    } catch (e) {
      next(e);
    }
  },

  // API để tạo FamilyMember mới
  async create(req, res, next) {
    try {
      const created = await familyMemberService.create(req.body, req.user);
      res.status(201).json({ success: true, data: created });
    } catch (e) {
      next(e);
    }
  },

  // API để cập nhật FamilyMember
  async update(req, res, next) {
    try {
      const updated = await familyMemberService.update(req.params.id, req.body, req.user);
      if (!updated) throw new ApiError(404, "Not found");
      res.json({ success: true, data: updated });
    } catch (e) {
      next(e);
    }
  },

  // API để xóa FamilyMember
  async remove(req, res, next) {
    try {
      const ok = await familyMemberService.remove(req.params.id, req.user);
      if (!ok) throw new ApiError(404, "Not found");
      res.json({ success: true, message: "Deleted" });
    } catch (e) {
      next(e);
    }
  },
};
