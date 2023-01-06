import { Router } from 'express';
import { cakesControllers } from '../controllers/cakesControllers.js';
import { cakesMiddlewares } from '../middlewares/cakesMiddlewares.js';

const cakesRouter = Router();

cakesRouter.post('/cakes', cakesMiddlewares, cakesControllers);

export default cakesRouter;