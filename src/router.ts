import express, { Application } from 'express';

import productsRouter from './products/controllers/products.controller';


function routerApi (app: Application): void {
  const router = express.Router();
  const router2 = express.Router();

  router.use(productsRouter);
  app.use('/api/', router);

  router2.use(productsRouter);
  app.use('/api/v2/', router2);
}

export default routerApi;
