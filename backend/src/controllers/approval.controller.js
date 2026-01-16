import * as approvalService from '../services/approval.service.js';

export const getApprovalsByEmployee = async (req, res, next) => {
  try {
    const approvals = await approvalService.getByEmployee(req.params.employeeId);
    res.json({ success: true, data: approvals });
  } catch (error) {
    next(error);
  }
};

export const createApproval = async (req, res, next) => {
  try {
    const approval = await approvalService.create(req.body);
    res.status(201).json({ success: true, data: approval });
  } catch (error) {
    next(error);
  }
};

export const updateApprovalStatus = async (req, res, next) => {
  try {
    const result = await approvalService.updateStatus(req.params.id, req.body.status);
    res.json({ success: true, message: result });
  } catch (error) {
    next(error);
  }
};
