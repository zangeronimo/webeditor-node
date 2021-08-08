import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import UsersController from '@api/controllers/webeditor/UsersController';


const usersController = new UsersController();

const usersRouter = Router();
usersRouter.get('/', ensureAuthenticated, usersController.getAll);
usersRouter.post('/', ensureAuthenticated, usersController.create);
usersRouter.put('/:id', ensureAuthenticated, usersController.update);
usersRouter.delete('/:id', ensureAuthenticated, usersController.delete);

export default usersRouter;
