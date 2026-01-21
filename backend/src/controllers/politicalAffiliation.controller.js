const ApiError = require("../utils/ApiError");
const politicalAffiliationService = require("../services/politicalAffiliation.service");

function validateCreate(body) {
  if (!body.employeeId) throw new ApiError(400, "employeeId is required");
  if (!body.youthUnionMembershipDate) throw new ApiError(400, "youthUnionMembershipDate is required");
  if (!body.partyMembershipDate) throw new ApiError(400, "partyMembershipDate is required");
  if (!body.partyStatus) throw new ApiError(400, "partyStatus is required");
  if (!body.policyRemarks) throw new ApiError(400, "policyRemarks is required");
}

module.exports = {
  async list(req, res, next) {
    try {
      const data = await politicalAffiliationService.list(req.query, req.user);
      res.json({ success: true, data });
    } catch (e) {
      next(e);
    }
  },

  async getById(req, res, next) {
    try {
      const row = await politicalAffiliationService.getById(req.params.id, req.user);
      if (!row) throw new ApiError(404, "Not found");
      res.json({ success: true, data: row });
    } catch (e) {
      next(e);
    }
  },

  async create(req, res, next) {
    try {
      validateCreate(req.body); // Validate the data before creating
      const created = await politicalAffiliationService.create(req.body, req.user);
      res.status(201).json({ success: true, data: created });
    } catch (e) {
      next(e);
    }
  },

  async update(req, res, next) {
    try {
      const updated = await politicalAffiliationService.update(req.params.id, req.body, req.user);
      if (!updated) throw new ApiError(404, "Not found");
      res.json({ success: true, data: updated });
    } catch (e) {
      next(e);
    }
  },

  async remove(req, res, next) {
    try {
      const ok = await politicalAffiliationService.remove(req.params.id, req.user);
      if (!ok) throw new ApiError(404, "Not found");
      res.json({ success: true, message: "Deleted" });
    } catch (e) {
      next(e);
    }
  },
};
