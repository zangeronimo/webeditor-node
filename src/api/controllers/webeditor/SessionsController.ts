import { Request, Response } from "express";

import AuthenticateUserService from "@domain/services/webeditor/AuthenticateUserService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    // const authenticateUser = container.resolve(AuthenticateUserService);

    // const { token } = await authenticateUser.execute({ email, password });

    return response.json({ token: '' });
  }
}
