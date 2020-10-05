import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profilesRouter = Router();
const profileController = new ProfileController();

profilesRouter.get('/', ensureAuthenticated, profileController.show);
profilesRouter.put('/', ensureAuthenticated, profileController.update);

export default profilesRouter;
