import { Joi, Segments } from 'celebrate';

export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).required(),
    description: Joi.string().min(1).max(1000).required(),
    date: Joi.date().iso().default(new Date().toISOString().split('T')[0]),
    emotions: Joi.array().items(Joi.string()).min(1).max(12).required(),
  }),
};

export const updateDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64),
    description: Joi.string().min(1).max(1000),
    date: Joi.date().iso(),
    emotions: Joi.array().items(Joi.string()).min(1).max(12),
  }),
};