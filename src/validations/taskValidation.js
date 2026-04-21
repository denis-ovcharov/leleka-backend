import { Joi, Segments } from 'celebrate';

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(1).max(96).required(),
    date: Joi.date().min(new Date().toISOString().split('T')[0]).iso().required(),
  }),
};

export const updateTaskStatusSchema = {
  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required(),
  }),
};