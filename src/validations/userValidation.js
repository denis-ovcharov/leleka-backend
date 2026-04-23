import { Joi, Segments } from 'celebrate';

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim().min(1),
    gender: Joi.string().valid('boy', 'girl', null),
    dueDate: Joi.date().iso().allow(null),
  }),
};

export const updateThemeSchema = {
  [Segments.BODY]: Joi.object({
    theme: Joi.string().valid('light', 'blue', 'pink').required(),
  }),
};

export const requestEmailChangeSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().max(64).required(),
  }),
};