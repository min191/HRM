import * as assignmentService from '../services/workAssignment.service.js';

export const assignTask = async (req, res, next) => {
  try {
    const assignment = await assignmentService.create(req.body);
    res.status(201).json({ success: true, data: assignment });
  } catch (error) {
    next(error);
  }
};
