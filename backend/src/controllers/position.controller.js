import * as positionService from '../services/position.service.js';

export const getAllPositions = async (req, res, next) => {
  try {
    const data = await positionService.getAll();
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const createPosition = async (req, res, next) => {
  try {
    const position = await positionService.create(req.body);
    res.status(201).json({ success: true, data: position });
  } catch (error) {
    next(error);
  }
};
