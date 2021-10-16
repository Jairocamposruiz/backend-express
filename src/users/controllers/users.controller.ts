import { Router, Request, Response, NextFunction } from 'express';

import UsersService from '../services/users.service';
import { validatorHandler } from '../../common/middlewares/validator.handler';
import { createUserSchema, updateUserSchema, getUserSchema } from '../dtos/user.dto';


const router = Router();
const usersService = new UsersService();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});


router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const user = await usersService.findOne(parseInt(id));
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await usersService.create(body);
      res.status(201).json({
        message: 'User was created'
      });
    } catch (error) {
      next(error);
    }
  }
);


router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const userEdited = await usersService.update(parseInt(id), body);
      res.status(200).json(userEdited);
    } catch (error) {
      next(error);
    }
  }
);


router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const rta = await usersService.delete(parseInt(id));
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);


export default router;
