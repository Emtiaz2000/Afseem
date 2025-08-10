/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import config from '../config';
import { TErrorSources } from '../interface/error';
import AppError from '../errors/AppError';
import { ZodError } from 'zod';
import HandleZodError from '../errors/HandleZodError';
import HandleValidationError from '../errors/HandleValidationError';
import HandleCastError from '../errors/HandleCastError';
import HandleDuplicateError from '../errors/HandleDuplicateError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // console.log('-------------------------------------->', err);
  let statusCode = 500;
  let message = 'An unexpected error occurred!';
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'An unexpected error occurred!',
    },
  ];
  if (err instanceof ZodError) {
    const simplifiedError = HandleZodError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    // Check Mongoose Validation Error...
    const simplifiedError = HandleValidationError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    // Checking id is valid or not valid
    const simplifiedError = HandleCastError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.code === 11000) {
    // Errors caused by Mongoose indexing
    const simplifiedError = HandleDuplicateError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  } else if (err instanceof SyntaxError) {
    message = 'An unexpected SyntaxError error occurred!';
    statusCode = 500;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof AppError) {
    message = err.message;
    statusCode = err?.statusCode;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // ultimate return
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorSources,
    // err, // after develop comment this line ...
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
