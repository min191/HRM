const ApiError = require("../utils/ApiError");
const service = require("../services/attendancePolicy.service");

function isTime(v) {
  // chấp nhận "HH:MM" hoặc "HH:MM:SS"
  return typeof v === "string" && /^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v);
}

function toMinutes(t) {
  const [hh, mm, ss] = t.split(":").map(Number);
  return hh * 60 + mm + (Number.isFinite(ss) ? ss / 60 : 0);
}

function validateCreate(body) {
  if (!body.name) throw new ApiError(400, "name is required");

  if (!isTime(body.checkInStart)) throw new ApiError(400, "checkInStart must be HH:MM or HH:MM:SS");
  if (!isTime(body.checkInEnd)) throw new ApiError(400, "checkInEnd must be HH:MM or HH:MM:SS");
  if (!isTime(body.autoCheckOutAt)) throw new ApiError(400, "autoCheckOutAt must be HH:MM or HH:MM:SS");

  if (body.checkOutStart != null && body.checkOutStart !== "" && !isTime(body.checkOutStart)) {
    throw new ApiError(400, "checkOutStart must be HH:MM or HH:MM:SS (or null)");
  }
  if (body.checkOutEnd != null && body.checkOutEnd !== "" && !isTime(body.checkOutEnd)) {
    throw new ApiError(400, "checkOutEnd must be HH:MM or HH:MM:SS (or null)");
  }

  // logic time window (cùng ngày)
  if (toMinutes(body.checkInStart) > toMinutes(body.checkInEnd)) {
    throw new ApiError(400, "checkInStart must be <= checkInEnd");
  }
  if (body.checkOutStart && body.checkOutEnd && toMinutes(body.checkOutStart) > toMinutes(body.checkOutEnd)) {
    throw new ApiError(400, "checkOutStart must be <= checkOutEnd");
  }

  const std = body.standardMinutes === undefined ? 480 : Number(body.standardMinutes);
  if (!Number.isFinite(std) || std <= 0) throw new ApiError(400, "standardMinutes must be a positive number");
}

function validateUpdate(body) {
  if (body.name !== undefined && body.name === "") throw new ApiError(400, "name cannot be empty");

  const timeFields = ["checkInStart", "checkInEnd", "checkOutStart", "checkOutEnd", "autoCheckOutAt"];
  for (const f of timeFields) {
    if (body[f] !== undefined) {
      if (body[f] == null || body[f] === "") {
        if (f === "checkInStart" || f === "checkInEnd" || f === "autoCheckOutAt") {
          throw new ApiError(400, `${f} cannot be null`);
        }
      } else if (!isTime(body[f])) {
        throw new ApiError(400, `${f} must be HH:MM or HH:MM:SS`);
      }
    }
  }

  if (body.standardMinutes !== undefined) {
    const std = Number(body.standardMinutes);
    if (!Number.isFinite(std) || std <= 0) throw new ApiError(400, "standardMinutes must be a positive number");
  }
}

module.exports = {
  async listPolicies(req, res, next) {
    try {
      const result = await service.list(req.query);
      res.json({ success: true, ...result });
    } catch (e) { next(e); }
  },

  async getPolicyById(req, res, next) {
    try {
      const row = await service.getById(req.params.id);
      if (!row) throw new ApiError(404, "AttendancePolicy not found");
      res.json({ success: true, data: row });
    } catch (e) { next(e); }
  },

  async createPolicy(req, res, next) {
    try {
      validateCreate(req.body);
      const created = await service.create(req.body);
      res.status(201).json({ success: true, data: created });
    } catch (e) { next(e); }
  },

  async updatePolicy(req, res, next) {
    try {
      validateUpdate(req.body);
      const updated = await service.update(req.params.id, req.body);
      if (!updated) throw new ApiError(404, "AttendancePolicy not found");
      res.json({ success: true, data: updated });
    } catch (e) { next(e); }
  },

  async deletePolicy(req, res, next) {
    try {
      const ok = await service.remove(req.params.id);
      if (!ok) throw new ApiError(404, "AttendancePolicy not found");
      res.json({ success: true, message: "Deleted" });
    } catch (e) { next(e); }
  }
};
