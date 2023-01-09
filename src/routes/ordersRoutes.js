import { Router } from 'express';
import { postOrdersControllers, getAllOrdersControllers, getOrdersByIdControllers, getOrdersByClientIdControllers } from '../controllers/ordersControllers.js';
import { postOrdersMiddlewares } from '../middlewares/ordersMiddlewares.js';

const ordersRouter = Router();

ordersRouter.post('/orders', postOrdersMiddlewares, postOrdersControllers);
ordersRouter.get('/orders', getAllOrdersControllers);
ordersRouter.get('/orders/:id', getOrdersByIdControllers);
ordersRouter.get('/clients/:id/orders', getOrdersByClientIdControllers);

export default ordersRouter;