import { Router, Request, Response, NextFunction } from 'express';

import OrdersService from '../services/orders.service';
import { createOrderSchema, updateOrderSchema, getOrderSchema } from '../dtos/order.dto';
import { validatorHandler } from '../../common/middlewares/validator.handler';


const router = Router();
const orderService = new OrdersService();

router.get('/', async (req: Request, res: Response) => {
  const orders = await orderService.find();
  res.status(200).json(orders);
});


router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const order = await orderService.findOne(parseInt(id));
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      await orderService.create(body);
      res.status(201).json({
        message: 'Order was created'
      });
    } catch (error) {
      next(error);
    }
  }
);


router.patch(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { id } = req.params;

    try {
      const orderEdited = await orderService.update(parseInt(id), body);
      res.status(200).json(orderEdited);
    } catch (error) {
      next(error);
    }
  }
)


router.delete(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const rta = await orderService.delete(parseInt(id));
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
)


export default router;
