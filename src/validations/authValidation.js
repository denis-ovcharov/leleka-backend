import { Joi, Segments } from 'celebrate';

const minDueDate = new Date();
minDueDate.setDate(minDueDate.getDate() + 7);

const maxDueDate = new Date();
maxDueDate.setDate(maxDueDate.getDate() + 280);

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32).required(),
    email: Joi.string().email().max(64).required(),
    password: Joi.string().min(8).max(128).required(),
    gender: Joi.string().valid('boy', 'girl', null).default(null),
    dueDate: Joi.date().min(minDueDate).max(maxDueDate).iso().allow(null),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const requestResetEmailSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const resetPasswordSchema = {
  [Segments.BODY]: Joi.object({
    password: Joi.string().min(8).required(),
    token: Joi.string().required(),
  }),
};
