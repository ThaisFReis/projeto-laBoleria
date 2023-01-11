import { Router } from 'express';
import { postOrders, getOrdersByDate, getOrdersById, getOrdersByClientId } from '../controllers/ordersControllers.js';
import { postOrdersMiddlewares } from '../middlewares/ordersMiddlewares.js';

const ordersRouter = Router();

ordersRouter.post('/orders', postOrdersMiddlewares, postOrders);
ordersRouter.get('/orders', getOrdersByDate);
ordersRouter.get('/orders/:id', getOrdersById);
ordersRouter.get('/clients/:id/orders', getOrdersByClientId);

export default ordersRouter;