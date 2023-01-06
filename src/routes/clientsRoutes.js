import { Router } from 'express';
import { clientsControllers } from '../controllers/clientsControllers.js';
import { clientsMiddlewares } from '../middlewares/clientsMiddlewares.js';

const clientsRouter = Router();

clientsRouter.post('/clients', clientsMiddlewares, clientsControllers);

export default clientsRouter;