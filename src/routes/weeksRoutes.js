import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getWeeksPublic,
  getWeeksPrivate,
  getBabyInfo,
  getMomInfo,
} from '../controllers/weeksController.js';

/**
 * @swagger
 * /weeks:
 *   get:
 *     summary: Get week info (public)
 *     parameters:
 *       - in: query
 *         name: week
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Week information
 *
 * /weeks/me:
 *   get:
 *     summary: Get week info for current user (private)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Week information for user
 *
 * /weeks/baby/{week}:
 *   get:
 *     summary: Get baby development info by week
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: week
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Baby development info
 *
 * /weeks/mom/{week}:
 *   get:
 *     summary: Get mom state info by week
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: week
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mom state info
 */

const router = Router();

router.get('/weeks', getWeeksPublic);
router.get('/weeks/me', authenticate, getWeeksPrivate);
router.get('/weeks/baby/:week', authenticate, getBabyInfo);
router.get('/weeks/mom/:week', authenticate, getMomInfo);

export default router;