const ApiError = require("../utils/ApiError");
const professionalQualificationsService = require("../services/professionalQualification.service");

function validateCreate(body) {
  if (!body.degree) throw new ApiError(400, "degree is required");
  if (!body.fieldOfStudy) throw new ApiError(400, "fieldOfStudy is required");
  if (!body.educationLevel) throw new ApiError(400, "educationLevel is required");
  if (!body.institution) throw new ApiError(400, "institution is required");
  if (!body.graduationYear) throw new ApiError(400, "graduationYear is required");
  if (!body.foreignLanguageProficiency) throw new ApiError(400, "foreignLanguageProficiency is required");
}

module.exports = {
  // Get list of professional qualifications
  async list(req, res, next) {
    try {
      const data = await professionalQualificationsService.list(req.query, req.user);
      res.json({ success: true, data });
    } catch (e) {
      next(e);
    }
  },

  // Get professional qualification by ID
  async getById(req, res, next) {
    try {
      const row = await professionalQualificationsService.getById(req.params.id, req.user);
      if (!row) throw new ApiError(404, "Not found");
      res.json({ success: true, data: row });
    } catch (e) {
      next(e);
    }
  },

  // Create a new professional qualification
  async create(req, res, next) {
    try {
      validateCreate(req.body);  // Validate the data before creating
      const created = await professionalQualificationsService.create(req.body, req.user);
      res.status(201).json({ success: true, data: created });
    } catch (e) {
      next(e);
    }
  },

  // Update professional qualification
  async update(req, res, next) {
    try {
      const updated = await professionalQualificationsService.update(req.params.id, req.body, req.user);
      if (!updated) throw new ApiError(404, "Not found");
      res.json({ success: true, data: updated });
    } catch (e) {
      next(e);
    }
  },

  // Remove professional qualification
  async remove(req, res, next) {
    try {
      const ok = await professionalQualificationsService.remove(req.params.id, req.user);
      if (!ok) throw new ApiError(404, "Not found");
      res.json({ success: true, message: "Deleted" });
    } catch (e) {
      next(e);
    }
  },
};
