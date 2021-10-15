import { Router, Request, Response, NextFunction } from 'express';

import CategoriesService from '../services/categories.service';
import { createCategoryDto, updateCategoryDto, getCategoryDto } from '../dtos/category.dto';
import { validatorHandler } from '../../common/middlewares/validator.handler';


const router = Router();
const categoriesService = new CategoriesService();

router.get('/', async (req: Request, res: Response) => {
  const categories = await categoriesService.find();
  res.status(200).json(categories);
});


router.get(
  '/:id',
  validatorHandler(getCategoryDto, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const category = await categoriesService.findOne(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);


router.post(
  '/',
  validatorHandler(createCategoryDto, 'body'),
  async (req: Request, res: Response) => {
    const body = req.body;
    await categoriesService.create(body);

    res.status(201).json({
      message: 'Category was created',
    });
  }
);


router.patch(
  '/:id',
  validatorHandler(getCategoryDto, 'params'),
  validatorHandler(updateCategoryDto, 'body'),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { id } = req.params;

    try {
      const categoryEdited = await categoriesService.update(id, body);
      res.status(200).json(categoryEdited);
    } catch (error) {
      next(error);
    }
  }
);


router.delete(
  '/:id',
  validatorHandler(getCategoryDto, 'params'),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const rta = await categoriesService.delete(id);
      res.status(200).json(rta);
    } catch (error) {
      next(error);
    }
  }
);


export default router;
