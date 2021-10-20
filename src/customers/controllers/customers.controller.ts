import { Router, Request, Response, NextFunction } from 'express';

import CustomersService from '../services/customers.service';
import { validatorHandler } from '../../common/middlewares/validator.handler';
import { createCustomerSchema, updateCustomerSchema, getCustomerSchema } from '../dtos/customer.dto';


const router = Router();
const customersService = new CustomersService();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await customersService.find();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
});


router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const customer = await customersService.findOne(parseInt(id));
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      await customersService.create(body);
      res.status(201).json({
        message: 'Customer was created'
      });
    } catch (error) {
      next(error);
    }
  }
);


router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const customerEdited = await customersService.update(parseInt(id), body);
      res.status(200).json(customerEdited);
    } catch (error) {
      next(error);
    }
  }
)


router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const rta = await customersService.delete(parseInt(id));
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
)

export default router;
