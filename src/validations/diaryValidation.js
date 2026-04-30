import { Joi, Segments } from 'celebrate';

export const createDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).trim().required(),
    description: Joi.string().min(1).max(1000).trim().required(),
    emotions: Joi.array().items(Joi.string().trim()).min(1).max(12).required(),
  }),
};

export const updateDiarySchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).max(64).trim(),
    description: Joi.string().min(1).max(1000).trim(),
    emotions: Joi.array().items(Joi.string().trim()).min(1).max(12),
  }),
};

export const diaryIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().length(24).hex().required(),
  }),
};
