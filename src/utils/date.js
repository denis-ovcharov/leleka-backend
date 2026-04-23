const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const DOT_DATE_REGEX = /^\d{2}\.\d{2}\.\d{4}$/;

const createUtcDate = (year, month, day) => {
  const date = new Date(Date.UTC(year, month - 1, day));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
};

export const parseSupportedDate = (value) => {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) {
      return null;
    }

    return createUtcDate(
      value.getUTCFullYear(),
      value.getUTCMonth() + 1,
      value.getUTCDate(),
    );
  }

  if (typeof value !== 'string') {
    return null;
  }

  const trimmedValue = value.trim();

  if (ISO_DATE_REGEX.test(trimmedValue)) {
    const [year, month, day] = trimmedValue.split('-').map(Number);
    return createUtcDate(year, month, day);
  }

  if (DOT_DATE_REGEX.test(trimmedValue)) {
    const [day, month, year] = trimmedValue.split('.').map(Number);
    return createUtcDate(year, month, day);
  }

  return null;
};

export const normalizeDateToIso = (value) => {
  const parsedDate = parseSupportedDate(value);

  return parsedDate ? parsedDate.toISOString().split('T')[0] : null;
};

export const getSupportedDateTimestamp = (value) => {
  const parsedDate = parseSupportedDate(value);

  return parsedDate ? parsedDate.getTime() : null;
};
