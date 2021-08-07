import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import { Router } from 'express';
import UsersController from '../../api/controllers/webeditor/UsersController';


const usersController = new UsersController();

const usersRouter = Router();
usersRouter.get('/', ensureAuthenticated, usersController.getAll);

export default usersRouter;