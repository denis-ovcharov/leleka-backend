import { Joi, Segments } from 'celebrate';
import { nullableSupportedDateSchema } from './dateValidation.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().min(2).max(32).required(),
    email: Joi.string().email().max(64).required(),
    password: Joi.string().min(8).max(128).required(),
    gender: Joi.string().valid('boy', 'girl', null).default(null),
    dueDate: nullableSupportedDateSchema,
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

export const loginWithGoogleSchema = {
  [Segments.BODY]: Joi.object({
    token: Joi.string().required(),
  }),
};