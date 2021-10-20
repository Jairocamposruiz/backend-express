import Boom from 'boom';
import { Request, Response, NextFunction } from 'express';
import { ValidationError, ForeignKeyConstraintError } from 'sequelize';


export function logErrors (error: Error, req: Request, res: Response, next: NextFunction) {
  console.error('Aquí mandaría el error a un servicio como sentry para gestion de errores');
  next(error);
}

export function errorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}

export function boomErrorHandler (error: Boom, req: Request, res: Response, next: NextFunction) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}

export function sequelizeErrorHandler (error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ValidationError) {
    res.status(409).json({
      'statusCode': 409,
      'error': error.errors[0].type,
      'message': error.errors[0].message
    });
  } else if (error instanceof ForeignKeyConstraintError) {
    res.status(409).json({
      'statusCode': 409,
      'error': "Error in Foreing key",
      'message': error.message
    })
  } else {
    next(error);
  }
}


