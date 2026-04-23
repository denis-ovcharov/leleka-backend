import { Joi, Segments } from 'celebrate';
import { supportedDateSchema } from './dateValidation.js';

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(1).max(96).required(),
    date: supportedDateSchema.required(),
  }),
};

export const updateTaskStatusSchema = {
  [Segments.BODY]: Joi.object({
    isDone: Joi.boolean().required(),
  }),
};

export const taskIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
};
