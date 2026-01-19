// src/controllers/employees.controller.js
const service = require("../services/employees.service");
const { ok, created, fail } = require("../utils/apiResponse");
const { parsePagination } = require("../utils/pagination");

async function list(req, res, next) {
  try {
    const { page, limit, offset } = parsePagination(req.query);
    const q = (req.query.q || "").toString().trim();

    const result = await service.listEmployees({ q, limit, offset });

    return ok(res, {
      page,
      limit,
      total: result.total,
      data: result.data,
    });
  } catch (e) {
    next(e);
  }
}

async function getOne(req, res, next) {
  try {
    const id = Number(req.params.id);
    const row = await service.getEmployee(id);
    if (!row) return fail(res, 404, "Employee not found");
    return ok(res, row);
  } catch (e) {
    next(e);
  }
}

async function create(req, res, next) {
  try {
    const row = await service.createEmployee(req.body);
    return created(res, row, "Employee created");
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const id = Number(req.params.id);
    const exists = await service.getEmployee(id);
    if (!exists) return fail(res, 404, "Employee not found");

    const row = await service.updateEmployee(id, req.body);
    return ok(res, row, "Employee updated");
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const id = Number(req.params.id);
    const exists = await service.getEmployee(id);
    if (!exists) return fail(res, 404, "Employee not found");

    await service.deleteEmployee(id);
    return ok(res, true, "Employee deleted");
  } catch (e) {
    // FK constraint hint
    if (String(e.message || "").toLowerCase().includes("foreign key constraint")) {
      return fail(res, 409, "FK_CONSTRAINT", {
        hint: "Bảng employees đang bị bảng khác tham chiếu. Nên dùng soft delete (status='INACTIVE') thay vì DELETE.",
      });
    }
    next(e);
  }
}

module.exports = { list, getOne, create, update, remove };