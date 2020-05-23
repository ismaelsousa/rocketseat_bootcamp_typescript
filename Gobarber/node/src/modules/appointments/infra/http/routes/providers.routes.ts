import { Router } from 'express';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providerRouter = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providerRouter.use(ensureAuth);

providerRouter.get('/', providersController.index);
providerRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);
providerRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

export default providerRouter;
