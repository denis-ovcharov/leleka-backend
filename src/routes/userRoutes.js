import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getCurrentUser,
  updateCurrentUser,
  updateUserAvatar,
  updateUserTheme,
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
import { updateUserSchema, updateThemeSchema } from '../validations/userValidation.js';

const router = Router();

router.get('/users/me', authenticate, getCurrentUser);
router.patch(
  '/users/me',
  authenticate,
  celebrate(updateUserSchema),
  updateCurrentUser,
);
router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);
router.patch(
  '/users/me/theme',
  authenticate,
  celebrate(updateThemeSchema),
  updateUserTheme,
);

export default router;