import * as taskService from '../services/task.service.js';

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAll();
    res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};
