import { Joi, Segments } from 'celebrate';

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim().min(1),
    gender: Joi.string().valid('boy', 'girl', null),
    dueDate: Joi.date().iso().allow(null),
    theme: Joi.string().valid('light', 'dark'),
  }),
};

export const updateThemeSchema = {
  [Segments.BODY]: Joi.object({
    theme: Joi.string().valid('light', 'dark').required(),
  }),
};