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

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 *   get:
 *     summary: Get all tasks
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 *
 * /tasks/{id}/status:
 *   patch:
 *     summary: Update task status
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
 *               isDone:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Task updated
 *
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task
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
 *         description: Task deleted
 */

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