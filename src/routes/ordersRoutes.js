import { Router } from 'express';
import { ordersControllers } from '../controllers/ordersControllers.js';
import { ordersMiddlewares } from '../middlewares/ordersMiddlewares.js';

const ordersRouter = Router();

ordersRouter.post('/orders', ordersMiddlewares, ordersControllers);

export default ordersRouter;