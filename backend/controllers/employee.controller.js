// controllers/employee.controller.js
import { EmployeeService } from "../services/employee.service.js";

export const EmployeeController = {
  getAll: async (req, res) => {
    const employees = await EmployeeService.getAll();
    res.json(employees);
  },

  getById: async (req, res) => {
    const employee = await EmployeeService.getById(req.params.id);
    res.json(employee);
  },

  create: async (req, res) => {
    const id = await EmployeeService.create(req.body);
    res.status(201).json({ id });
  }
};
