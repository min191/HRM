const ApiError = require("../utils/ApiError");
const service = require("../services/departments.service");

function validateCreate(body) {
  if (!body.departmentName) throw new ApiError(400, "departmentName is required");
  if (body.departmentCode !== undefined && body.departmentCode === "") {
    throw new ApiError(400, "departmentCode cannot be empty string");
  }
}

function validateUpdate(body) {
  if (body.departmentName !== undefined && body.departmentName === "") {
    throw new ApiError(400, "departmentName cannot be empty");
  }
  if (body.departmentCode !== undefined && body.departmentCode === "") {
    throw new ApiError(400, "departmentCode cannot be empty string");
  }
}

module.exports = {
  async listDepartments(req, res, next) {
    try {
      const result = await service.list(req.query);
      res.json({ success: true, ...result });
    } catch (e) { next(e); }
  },

  async getDepartmentById(req, res, next) {
    try {
      const row = await service.getById(req.params.id);
      if (!row) throw new ApiError(404, "Department not found");
      res.json({ success: true, data: row });
    } catch (e) { next(e); }
  },

  async createDepartment(req, res, next) {
    try {
      validateCreate(req.body);
      const created = await service.create(req.body);
      res.status(201).json({ success: true, data: created });
    } catch (e) { next(e); }
  },

  async updateDepartment(req, res, next) {
    try {
      validateUpdate(req.body);
      const updated = await service.update(req.params.id, req.body);
      if (!updated) throw new ApiError(404, "Department not found");
      res.json({ success: true, data: updated });
    } catch (e) { next(e); }
  },

  async deleteDepartment(req, res, next) {
    try {
      const ok = await service.remove(req.params.id);
      if (!ok) throw new ApiError(404, "Department not found");
      res.json({ success: true, message: "Deleted" });
    } catch (e) { next(e); }
  }
};
