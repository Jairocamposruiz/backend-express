import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import boom from '@hapi/boom';


type Property = 'params' | 'body' | 'query';

export function validatorHandler (dto: Joi.Schema, property: Property) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = dto.validate(data, { abortEarly: false });

    if (error) next(boom.badRequest(error.toString()));

    next();
  };
}

// abortEarly es para que termine de validar todos los campos y de una respuesta con todos los fallos.
