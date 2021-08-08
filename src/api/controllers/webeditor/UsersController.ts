import ShowUsersService from "@domain/services/webeditor/ShowUsersService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UsersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { user } = request;

    const showUsers = container.resolve(ShowUsersService);

    const users = await showUsers.execute({ company_id: user.company });

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    return response.json({ msg: 'create' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return response.json({ msg: 'create' });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    return response.json({ msg: 'create' });
  }
}
