const ApiError = require("../utils/ApiError");
const service = require("../services/tasks.service");

function validateCreate(body) {
  if (!body.taskName) throw new ApiError(400, "taskName is required");
  if (body.taskCode !== undefined && body.taskCode === "") {
    throw new ApiError(400, "taskCode cannot be empty string");
  }
}

function validateUpdate(body) {
  if (body.taskName !== undefined && body.taskName === "") {
    throw new ApiError(400, "taskName cannot be empty");
  }
  if (body.taskCode !== undefined && body.taskCode === "") {
    throw new ApiError(400, "taskCode cannot be empty string");
  }
}

module.exports = {
  async listTasks(req, res, next) {
    try {
      const result = await service.list(req.query);
      res.json({ success: true, ...result });
    } catch (e) { next(e); }
  },

  async getTaskById(req, res, next) {
    try {
      const row = await service.getById(req.params.id);
      if (!row) throw new ApiError(404, "Task not found");
      res.json({ success: true, data: row });
    } catch (e) { next(e); }
  },

  async createTask(req, res, next) {
    try {
      validateCreate(req.body);
      const created = await service.create(req.body);
      res.status(201).json({ success: true, data: created });
    } catch (e) { next(e); }
  },

  async updateTask(req, res, next) {
    try {
      validateUpdate(req.body);
      const updated = await service.update(req.params.id, req.body);
      if (!updated) throw new ApiError(404, "Task not found");
      res.json({ success: true, data: updated });
    } catch (e) { next(e); }
  },

  async deleteTask(req, res, next) {
    try {
      const ok = await service.remove(req.params.id);
      if (!ok) throw new ApiError(404, "Task not found");
      res.json({ success: true, message: "Deleted" });
    } catch (e) { next(e); }
  }
};
