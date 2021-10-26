import { Router, Request, Response, NextFunction } from 'express';

import ProductsService from '../services/products.service';
import { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } from '../dtos/product.dto';
import { validatorHandler } from '../../common/middlewares/validator.handler';


const router = Router();
const productsService = new ProductsService();

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;

    try {
      const products = await productsService.find(query);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
);


router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const product = await productsService.findOne(parseInt(id));
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req: Request, res: Response) => {
    const body = req.body;
    await productsService.create(body);

    res.status(201).json({
      message: 'Product was created',
    });
  }
);


router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { id } = req.params;

    try {
      const productEdited = await productsService.update(parseInt(id), body);
      res.status(200).json(productEdited);
    } catch (error) {
      next(error);
    }
  }
);


router.delete(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const rta = await productsService.delete(parseInt(id));
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);


export default router;
