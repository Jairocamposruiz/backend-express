import Boom from 'boom';
import { Request, Response, NextFunction } from 'express';


export function logErrors (error: Error, req: Request, res: Response, next: NextFunction) {
  console.error("Aquí mandaría el error a un servicio como sentry para gestion de errores");
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
    res.status(output.statusCode).json(output.payload)
  } else {
    next(error)
  }
}


