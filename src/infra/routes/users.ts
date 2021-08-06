import { Router } from 'express';
import UsersController from '../../api/controllers/UsersController';


const usersController = new UsersController();

const usersRouter = Router();
usersRouter.get('/', usersController.getAll);

export default usersRouter;