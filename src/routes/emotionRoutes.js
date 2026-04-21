import { Router } from 'express';
import { getEmotions } from '../controllers/emotionController.js';

const router = Router();

router.get('/emotions', getEmotions);

export default router;