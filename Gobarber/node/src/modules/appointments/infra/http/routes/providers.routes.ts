import { Router } from 'express';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ProvidersController from '../controllers/ProvidersController';

const providerRouter = Router();
const providersController = new ProvidersController();
providerRouter.use(ensureAuth);

providerRouter.get('/', providersController.index);

export default providerRouter;
