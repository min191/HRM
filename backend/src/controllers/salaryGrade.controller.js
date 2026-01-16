import * as salaryGradeService from '../services/salaryGrade.service.js';

export const getAllSalaryGrades = async (req, res, next) => {
  try {
    const data = await salaryGradeService.getAll();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createSalaryGrade = async (req, res, next) => {
  try {
    const grade = await salaryGradeService.create(req.body);
    res.status(201).json({ success: true, data: grade });
  } catch (error) {
    next(error);
  }
};
