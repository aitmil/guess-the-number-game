import createHttpError from 'http-errors';

export const routeNotFoundHandler = (req, res, next) => {
  next(createHttpError(404, 'Route not found'));
};
