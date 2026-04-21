import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getWeeksPublic,
  getWeeksPrivate,
  getBabyInfo,
  getMomInfo,
} from '../controllers/weeksController.js';

const router = Router();

router.get('/weeks', getWeeksPublic);
router.get('/weeks/me', authenticate, getWeeksPrivate);
router.get('/weeks/baby/:week', authenticate, getBabyInfo);
router.get('/weeks/mom/:week', authenticate, getMomInfo);

export default router;