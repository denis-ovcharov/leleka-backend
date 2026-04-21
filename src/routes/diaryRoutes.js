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
  updateDiarySchema,
} from '../validations/diaryValidation.js';

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
  celebrate(updateDiarySchema),
  updateDiary,
);
router.delete('/diaries/:id', authenticate, deleteDiary);

export default router;