import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  void next;
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  if (
    err.name === 'CastError' ||
    err.name === 'ValidationError' ||
    err.name === 'MulterError' ||
    err.message === 'Only images allowed.'
  ) {
    return res.status(400).json({
      message: err.message || err.name,
    });
  }

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};
