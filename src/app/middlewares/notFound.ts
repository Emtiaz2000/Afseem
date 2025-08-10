import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

const notFound = (req: Request, res: Response, next: NextFunction): void => {
  next(
    new AppError(
      httpStatus.NOT_FOUND,
      `Route request : '${req.originalUrl}' not found`,
    ),
  );
};

export default notFound;
