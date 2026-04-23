import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  createDiary,
  getDiaries,
  updateDiary,
  deleteDiary,
} from '../controllers/diaryController.js';
import {
  createDiarySchema,
  diaryIdSchema,
  updateDiarySchema,
} from '../validations/diaryValidation.js';

/**
 * @swagger
 * /diaries:
 *   post:
 *     summary: Create a new diary entry
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 description: Use DD.MM.YYYY or YYYY-MM-DD
 *                 example: 24.10.2027
 *               emotions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Diary entry created
 *   get:
 *     summary: Get all diary entries
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of diary entries
 *
 * /diaries/{id}:
 *   patch:
 *     summary: Update diary entry
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 description: Use DD.MM.YYYY or YYYY-MM-DD
 *                 example: 24.10.2027
 *               emotions:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Diary entry updated
 *   delete:
 *     summary: Delete diary entry
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Diary entry deleted
 */

const router = Router();

router.post(
  '/diaries',
  authenticate,
  celebrate(createDiarySchema),
  createDiary,
);
router.get('/diaries', authenticate, getDiaries);
router.patch(
  '/diaries/:id',
  authenticate,
  celebrate(diaryIdSchema),
  celebrate(updateDiarySchema),
  updateDiary,
);
router.delete('/diaries/:id', authenticate, celebrate(diaryIdSchema), deleteDiary);

export default router;
