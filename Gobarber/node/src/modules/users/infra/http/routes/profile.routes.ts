import { Router } from 'express';
import ensureAuth from '../middlewares/ensureAuth';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuth);

const profileController = new ProfileController();

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
