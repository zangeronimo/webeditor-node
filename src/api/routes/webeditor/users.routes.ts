import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import UsersController from '@api/controllers/webeditor/UsersController';
import hasPermission from '@infra/middlewares/hasPermission';
import { celebrate, Joi, Segments } from 'celebrate';


const usersController = new UsersController();

const usersRouter = Router();
usersRouter.get('/', ensureAuthenticated, hasPermission('WEBEDITORUSER_VIEW'), usersController.getAll);
usersRouter.post('/',
celebrate({
  [Segments.BODY]: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), ensureAuthenticated, hasPermission('WEBEDITORUSER_ALTER'), usersController.create);
usersRouter.put('/:id',
celebrate({
  [Segments.BODY]: {
    id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
  }
}), ensureAuthenticated, hasPermission('WEBEDITORUSER_ALTER'), usersController.update);
usersRouter.delete('/:id', ensureAuthenticated, hasPermission('WEBEDITORUSER_DELETE'), usersController.delete);

export default usersRouter;
