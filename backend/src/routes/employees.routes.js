// src/routes/employees.routes.js
const express = require("express");
const router = express.Router();

const controller = require("../controllers/employees.controllers");
const { validateBody } = require("../middlewares/validate");
const {
  employeeCreateSchema,
  employeeUpdateSchema,
} = require("../validators/employees.schema");

// CRUD
router.get("/", controller.list);
router.get("/:id", controller.getOne);
router.post("/", validateBody(employeeCreateSchema), controller.create);
router.put("/:id", validateBody(employeeUpdateSchema), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;