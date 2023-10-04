import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";

import { SessionsController } from "@api/controllers/webeditor/SessionsController";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import AuthenticateUserService from "@domain/services/webeditor/AuthenticateUserService";
import IHashProvider from "@infra/providers/HashProvider/models/IHashProvider";

export class SessionRoutes {
  static Create(hashProvider: IHashProvider, userRepository: IUsersRepository) {    
    const sessionsRouter = Router();
    const authenticateUserService = new AuthenticateUserService(userRepository, hashProvider);
    const sessionsController = new SessionsController(authenticateUserService);

    sessionsRouter.post(
      '/',
      celebrate({
        [Segments.BODY]: {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }
      }),
      sessionsController.create
    );

    return sessionsRouter;
  }
}


