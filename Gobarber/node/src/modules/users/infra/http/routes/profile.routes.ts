import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuth from '../middlewares/ensureAuth';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
profileRouter.use(ensureAuth);

const profileController = new ProfileController();

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
    },
  }),
  profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
