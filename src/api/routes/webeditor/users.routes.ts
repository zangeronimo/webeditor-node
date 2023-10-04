import { Router } from 'express';

import ensureAuthenticated from '@infra/middlewares/ensureAuthenticated';
import { UsersController } from '@api/controllers/webeditor/UsersController';
import hasPermission from '@infra/middlewares/hasPermission';
import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import UserHasRoleService from '@domain/services/webeditor/UserHasRoleService';
import ShowUserService from '@domain/services/webeditor/users/ShowUserService';
import FindByIdUserService from '@domain/services/webeditor/users/FindByIdUserService';
import { celebrate, Segments, Joi } from 'celebrate';
import CreateUserService from '@domain/services/webeditor/users/CreateUserService';
import IHashProvider from '@infra/providers/HashProvider/models/IHashProvider';
import UpdateUserService from '@domain/services/webeditor/users/UpdateUserService';

export class UserRoutes {
  static Create(userRepository: IUsersRepository, hashProvider: IHashProvider) {
    const usersRouter = Router();
    const userHasRoleService = new UserHasRoleService(userRepository);
    const showUserService = new ShowUserService(userRepository);
    const findUserService = new FindByIdUserService(userRepository);
    const createUserService = new CreateUserService(userRepository, hashProvider);
    const updateUserService = new UpdateUserService(userRepository, hashProvider)
    const usersController = new UsersController(showUserService, findUserService, createUserService, updateUserService);

    usersRouter.get('/', ensureAuthenticated, hasPermission(userHasRoleService, 'WEBEDITORUSER_VIEW'), usersController.getAll);
    usersRouter.get('/:id', ensureAuthenticated, hasPermission(userHasRoleService, 'WEBEDITORUSER_VIEW'), usersController.getById);
    usersRouter.post('/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        roles: Joi.array(),
      }
    }), ensureAuthenticated, hasPermission(userHasRoleService, 'WEBEDITORUSER_ALTER'), usersController.create);
    usersRouter.put('/:id',
    celebrate({
      [Segments.BODY]: {
        id: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string(),
        roles: Joi.array(),
      }
    }), ensureAuthenticated, hasPermission(userHasRoleService, 'WEBEDITORUSER_ALTER'), usersController.update);

    return usersRouter;
  }
}

// usersRouter.delete('/:id', ensureAuthenticated, hasPermission('WEBEDITORUSER_DELETE'), usersController.delete);

// export default usersRouter;
