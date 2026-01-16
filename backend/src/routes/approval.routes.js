// src/routes/position.routes.js - Position routes
import express from 'express';
import { query } from '../config/db.js';
import { authenticate, requireAdmin } from '../middlewares/auth.js';
import { validateId } from '../middlewares/validator.js';
import { AppError } from '../middlewares/errorHandler.js';

const router = express.Router();

/**
 * GET /api/positions
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const positions = await query('SELECT * FROM positions ORDER BY positionName');
    res.json({ success: true, data: positions });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/positions/:id
 */
router.get('/:id', authenticate, validateId, async (req, res, next) => {
  try {
    const positions = await query('SELECT * FROM positions WHERE id = ?', [req.params.id]);
    
    if (positions.length === 0) {
      throw new AppError('Không tìm thấy chức vụ', 404);
    }
    
    res.json({ success: true, data: positions[0] });
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/positions (ADMIN only)
 */
router.post('/', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { positionCode, positionName } = req.body;

    if (!positionCode || !positionName) {
      throw new AppError('Thiếu thông tin bắt buộc', 400);
    }

    const result = await query(
      'INSERT INTO positions (positionCode, positionName) VALUES (?, ?)',
      [positionCode, positionName]
    );

    res.status(201).json({
      success: true,
      message: 'Tạo chức vụ thành công',
      data: { id: result.insertId, positionCode, positionName }
    });
  } catch (error) {
    next(error);
  }
});

/**
 * PUT /api/positions/:id (ADMIN only)
 */
router.put('/:id', authenticate, requireAdmin, validateId, async (req, res, next) => {
  try {
    const { positionCode, positionName } = req.body;

    await query(
      'UPDATE positions SET positionCode = ?, positionName = ? WHERE id = ?',
      [positionCode, positionName, req.params.id]
    );

    res.json({ success: true, message: 'Cập nhật chức vụ thành công' });
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/positions/:id (ADMIN only)
 */
router.delete('/:id', authenticate, requireAdmin, validateId, async (req, res, next) => {
  try {
    await query('DELETE FROM positions WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Xóa chức vụ thành công' });
  } catch (error) {
    next(error);
  }
});

export default router;