import { Router, Request, Response } from 'express';


const router = Router();

router.get('/products', (req: Request, res: Response) => {
  res.status(200).send('Products');
});

export default router;
