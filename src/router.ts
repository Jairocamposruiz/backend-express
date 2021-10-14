import { Router, Application } from 'express';

import productsRouter from './products/controllers/products.controller';
import categoriesRouter from './categories/controllers/categories.controller';
import usersRouter from './users/controllers/users.controller';


function routerApi (app: Application): void {
  const router = Router();

  router.use('/products/', productsRouter);
  router.use('/categories/', categoriesRouter);
  router.use('/users/', usersRouter);

  app.use('/api/v1', router);
}

export default routerApi;
