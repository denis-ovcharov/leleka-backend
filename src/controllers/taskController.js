import createHttpError from 'http-errors';
import { Task } from '../models/task.js';
import {
  getSupportedDateTimestamp,
  normalizeDateToIso,
} from '../utils/date.js';

const INVALID_TASK_DATE_MESSAGE = 'Invalid date: use DD.MM.YYYY or YYYY-MM-DD';

export const createTask = async (req, res) => {
  const { name, date } = req.body;
  const normalizedDate = normalizeDateToIso(date);

  if (!normalizedDate) {
    throw createHttpError(400, INVALID_TASK_DATE_MESSAGE);
  }

  const task = await Task.create({
    userId: req.user._id,
    name,
    date: normalizedDate,
  });

  res.status(201).json(task);
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });

  tasks.sort((leftTask, rightTask) => {
    const leftTimestamp = getSupportedDateTimestamp(leftTask.date) ?? 0;
    const rightTimestamp = getSupportedDateTimestamp(rightTask.date) ?? 0;

    return leftTimestamp - rightTimestamp;
  });

  res.status(200).json(tasks);
};

export const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { isDone } = req.body;

  const task = await Task.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { isDone },
    { returnDocument: 'after' },
  );

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(200).json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

  if (!task) {
    throw createHttpError(404, 'Task not found');
  }

  res.status(204).send();
};
