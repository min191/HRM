// routes/employee.routes.js
import express from "express";
import { EmployeeController } from "../controllers/employee.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const employeeRoutes = express.Router();

employeeRoutes.get("/", authMiddleware, EmployeeController.getAll);
employeeRoutes.get("/:id", authMiddleware, EmployeeController.getById);
employeeRoutes.post("/", authMiddleware, EmployeeController.create);
export default employeeRoutes;
