import { Request, Response } from "express";
import User from "../../domain/models/User";

export default class UsersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const users = [
      new User('Luciano', 'zangeronimo@gmail.com'),
      new User('Enrico', 'enrico@gmail.com'),
      new User('Ingrid', 'ingrid@gmail.com'),
    ]
    return response.json({ users });
  }
}