import { Joi, Segments } from 'celebrate';

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(96).required(),
    date: Joi.string().pattern(/^\d{2}\.\d{2}\.\d{4}$|^\d{4}-\d{2}-\d{2}$/).required(),
  }),
};

export const updateTaskStatusSchema = {
  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required(),
  }),
};