// services/employee.service.js
import { EmployeeModel } from "../models/employee.model.js";

export const EmployeeService = {
  getAll: () => EmployeeModel.findAll(),

  getById: (id) => EmployeeModel.findById(id),

  create: (data) => EmployeeModel.create(data)
};
