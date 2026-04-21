import { Router } from 'express';
import { celebrate } from 'celebrate';
import { authenticate } from '../middleware/authenticate.js';
import {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} from '../controllers/taskController.js';
import {
  createTaskSchema,
  updateTaskStatusSchema,
} from '../validations/taskValidation.js';

const router = Router();

router.post(
  '/tasks',
  authenticate,
  celebrate(createTaskSchema),
  createTask,
);
router.get('/tasks', authenticate, getTasks);
router.patch(
  '/tasks/:id/status',
  authenticate,
  celebrate(updateTaskStatusSchema),
  updateTaskStatus,
);
router.delete('/tasks/:id', authenticate, deleteTask);

export default router;