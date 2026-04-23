import { Joi, Segments } from 'celebrate';
import { supportedDateSchema } from './dateValidation.js';

export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).max(64).required(),
    description: Joi.string().trim().min(1).max(1000).required(),
    date: supportedDateSchema,
    emotions: Joi.array().items(Joi.string().trim()).min(1).max(12).required(),
  }),
};

export const updateDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).max(64),
    description: Joi.string().trim().min(1).max(1000),
    date: supportedDateSchema,
    emotions: Joi.array().items(Joi.string().trim()).min(1).max(12),
  }),
};

export const diaryIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
};
