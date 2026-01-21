const ApiError = require("../utils/ApiError");
const service = require("../services/approvals.service");

function validateCreate(body) {
  if (!body.type) throw new ApiError(400, "type is required");
  if (!body.reason) throw new ApiError(400, "reason is required");
  if (!body.startDate) throw new ApiError(400, "startDate is required");
  if (!body.endDate) throw new ApiError(400, "endDate is required");
}

module.exports = {
  async listApprovals(req, res, next) {
    try {
      const data = await service.list(req.query, req.user);
      res.json({ success: true, data });
    } catch (e) {
      next(e);
    }
  },

  async getApprovalById(req, res, next) {
    try {
      const row = await service.getById(req.params.id, req.user);
      if (!row) throw new ApiError(404, "Approval not found");
      res.json({ success: true, data: row });
    } catch (e) {
      next(e);
    }
  },

  async createApproval(req, res, next) {
    try {
      validateCreate(req.body);
      const created = await service.create(req.body, req.user);
      res.status(201).json({ success: true, data: created });
    } catch (e) {
      next(e);
    }
  },

  async updateApproval(req, res, next) {
    try {
      const updated = await service.update(req.params.id, req.body, req.user);
      if (!updated) throw new ApiError(404, "Approval not found");
      res.json({ success: true, data: updated });
    } catch (e) {
      next(e);
    }
  },

  async deleteApproval(req, res, next) {
    try {
      const ok = await service.remove(req.params.id, req.user);
      if (!ok) throw new ApiError(404, "Approval not found");
      res.json({ success: true, message: "Deleted" });
    } catch (e) {
      next(e);
    }
  },

  async submitApproval(req, res, next) {
    try {
      const row = await service.submit(req.params.id, req.user);
      res.json({ success: true, data: row });
    } catch (e) {
      next(e);
    }
  },

  async approveApproval(req, res, next) {
    try {
      const row = await service.approve(req.params.id, req.body, req.user);
      res.json({ success: true, data: row });
    } catch (e) {
      next(e);
    }
  },

  async rejectApproval(req, res, next) {
    try {
      const row = await service.reject(req.params.id, req.body, req.user);
      res.json({ success: true, data: row });
    } catch (e) {
      next(e);
    }
  },
};
