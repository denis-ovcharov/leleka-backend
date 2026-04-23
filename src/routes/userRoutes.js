import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  getCurrentUser,
  updateCurrentUser,
  updateUserAvatar,
  updateUserTheme,
  requestEmailChange,
  confirmEmailChange,
} from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';
import { updateUserSchema, updateThemeSchema, requestEmailChangeSchema } from '../validations/userValidation.js';

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *   patch:
 *     summary: Update current user (theme auto-changes based on gender)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [boy, girl, null]
 *               dueDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated
 *
 * /users/me/avatar:
 *   patch:
 *     summary: Update user avatar
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar updated
 *
 * /users/me/theme:
 *   patch:
 *     summary: Update user theme (blue/pink/light based on gender)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *                 enum: [light, blue, pink]
 *     responses:
 *       200:
 *         description: Theme updated
 *
 * /users/me/request-email-change:
 *   patch:
 *     summary: Request email change
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Confirmation email sent
 *       400:
 *         description: Email already in use
 *
 * /users/me/confirm-email-change:
 *   post:
 *     summary: Confirm email change
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email changed successfully
 *       400:
 *         description: Invalid or expired token
 */

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
router.patch(
  '/users/me/request-email-change',
  authenticate,
  celebrate(requestEmailChangeSchema),
  requestEmailChange,
);
router.post('/users/me/confirm-email-change', confirmEmailChange);

export default router;