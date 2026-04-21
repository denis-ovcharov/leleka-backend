import { Joi, Segments } from 'celebrate';

const minDueDate = new Date();
minDueDate.setDate(minDueDate.getDate() + 7);

const maxDueDate = new Date();
maxDueDate.setDate(maxDueDate.getDate() + 280);

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    username: Joi.string().trim().min(1),
    gender: Joi.string().valid('boy', 'girl', null),
    dueDate: Joi.date().min(minDueDate).max(maxDueDate).iso().allow(null),
    theme: Joi.string().valid('light', 'dark'),
  }),
};
