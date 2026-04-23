import { Joi } from 'celebrate';
import { parseSupportedDate } from '../utils/date.js';

const SUPPORTED_DATE_MESSAGE = 'Date must be in DD.MM.YYYY or YYYY-MM-DD format';

const supportedDateValidator = (value, helpers) => {
  if (!parseSupportedDate(value)) {
    return helpers.message(SUPPORTED_DATE_MESSAGE);
  }

  return value.trim();
};

export const supportedDateSchema = Joi.string()
  .trim()
  .custom(supportedDateValidator, 'supported date validation');

export const nullableSupportedDateSchema = supportedDateSchema.allow(null);
