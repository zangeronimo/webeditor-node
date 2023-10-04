import { Request, Response } from "express";

import { IAuthenticateUserService } from "@domain/interfaces/services/webeditor/IAuthenticateUserService";
import { AuthenticateUserModel } from "@domain/models/webeditor/AuthenticateUserModel";

export class SessionsController {
  constructor(readonly authenticateUserService: IAuthenticateUserService) { }

  public create = async(request: Request, response: Response): Promise<Response> => {
    const { email, password } = request.body;
    const token = await this.authenticateUserService.execute(new AuthenticateUserModel(email, password));

    return response.json(token);
  }
}
