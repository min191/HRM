import * as familyService from '../services/familyMember.service.js';

export const addFamilyMember = async (req, res, next) => {
  try {
    const member = await familyService.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};
