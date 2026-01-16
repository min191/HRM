import * as salaryService from '../services/salary.service.js';

export const calculateMonthlySalary = async (req, res, next) => {
  try {
    const salary = await salaryService.calculate(
      req.params.employeeId,
      req.body.month,
      req.body.year
    );
    res.json({ success: true, data: salary });
  } catch (error) {
    next(error);
  }
};
