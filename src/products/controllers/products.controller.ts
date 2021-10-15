import { Router, Request, Response, NextFunction } from 'express';

import ProductsService from '../services/products.service';
import { createProductDto, updateProductDto, getProductDto } from '../dtos/product.dto';
import { validatorHandler } from '../../common/middlewares/validator.handler';


const router = Router();
const productsService = new ProductsService();

router.get('/', async (req: Request, res: Response) => {
  const products = await productsService.find();
  res.status(200).json(products);
});


router.get(
  '/:id',
  validatorHandler(getProductDto, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const product = await productsService.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  validatorHandler(createProductDto, 'body'),
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
  validatorHandler(getProductDto, 'params'),
  validatorHandler(updateProductDto, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { id } = req.params;

    try {
      const productEdited = await productsService.update(id, body);
      res.status(200).json(productEdited);
    } catch (error) {
      next(error);
    }
  }
);


router.delete(
  '/:id',
  validatorHandler(getProductDto, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const rta = await productsService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);


export default router;
