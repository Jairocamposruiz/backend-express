import { Router, Request, Response, NextFunction } from 'express';

import UsersService from '../services/users.service';
import { validatorHandler } from '../../common/middlewares/validator.handler';
import { createUserSchema, updateUserSchema, getUserSchema } from '../dtos/user.dto';


const router = Router();
const usersService = new UsersService();

router.get('/', async (req: Request, res: Response) => {
  const users = await usersService.find();
  res.status(200).json(users);
});


router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const user = await usersService.findOne(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req: Request, res: Response) => {
    const body = req.body;
    await usersService.create(body);

    res.status(201).json({
      message: 'User was created'
    });
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
      const userEdited = await usersService.update(id, body);
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
      const rta = await usersService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);


export default router;
