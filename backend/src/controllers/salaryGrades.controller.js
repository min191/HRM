const ApiError = require("../utils/ApiError");
const service = require("../services/salaryGrades.service");

function toNumber(v) {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function validateCreate(body) {
  if (!body.gradeName) throw new ApiError(400, "gradeName is required");

  const coef = toNumber(body.coefficient);
  if (coef === null) throw new ApiError(400, "coefficient is required and must be a number");
  if (coef <= 0) throw new ApiError(400, "coefficient must be > 0");
}

function validateUpdate(body) {
  if (body.gradeName !== undefined && body.gradeName === "") {
    throw new ApiError(400, "gradeName cannot be empty");
  }
  if (body.coefficient !== undefined) {
    const coef = toNumber(body.coefficient);
    if (coef === null) throw new ApiError(400, "coefficient must be a number");
    if (coef <= 0) throw new ApiError(400, "coefficient must be > 0");
  }
}

module.exports = {
  async listSalaryGrades(req, res, next) {
    try {
      const result = await service.list(req.query);
      res.json({ success: true, ...result });
    } catch (e) { next(e); }
  },

  async getSalaryGradeById(req, res, next) {
    try {
      const row = await service.getById(req.params.id);
      if (!row) throw new ApiError(404, "SalaryGrade not found");
      res.json({ success: true, data: row });
    } catch (e) { next(e); }
  },

  async createSalaryGrade(req, res, next) {
    try {
      validateCreate(req.body);
      const created = await service.create(req.body);
      res.status(201).json({ success: true, data: created });
    } catch (e) { next(e); }
  },

  async updateSalaryGrade(req, res, next) {
    try {
      validateUpdate(req.body);
      const updated = await service.update(req.params.id, req.body);
      if (!updated) throw new ApiError(404, "SalaryGrade not found");
      res.json({ success: true, data: updated });
    } catch (e) { next(e); }
  },

  async deleteSalaryGrade(req, res, next) {
    try {
      const ok = await service.remove(req.params.id);
      if (!ok) throw new ApiError(404, "SalaryGrade not found");
      res.json({ success: true, message: "Deleted" });
    } catch (e) { next(e); }
  }
};
