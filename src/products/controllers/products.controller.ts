import { Router, Request, Response } from 'express';


const router = Router();

router.get('/products', (req: Request, res: Response) => {
  res.send('Products');
});

export default router;
