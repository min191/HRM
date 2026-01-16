import * as workHistoryService from '../services/workHistory.service.js';

export const addWorkHistory = async (req, res, next) => {
  try {
    const history = await workHistoryService.create(req.body);
    res.status(201).json({ success: true, data: history });
  } catch (error) {
    next(error);
  }
};

export const getWorkHistoryByEmployee = async (req, res, next) => {
  try {
    const data = await workHistoryService.getByEmployee(req.params.employeeId);
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
