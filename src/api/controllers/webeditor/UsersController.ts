import CreateUserService from "@domain/services/webeditor/users/CreateUserService";
import DeleteUserService from "@domain/services/webeditor/users/DeleteUserService";
import ShowUsersService from "@domain/services/webeditor/users/ShowUserService";
import UpdateUserService from "@domain/services/webeditor/users/UpdateUserService";
import AppError from "@infra/errors/AppError";
import User from "@infra/typeorm/entities/webeditor/User";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UsersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const filter = request.query;

    const showUsers = container.resolve(ShowUsersService);
    const users = await showUsers.execute({ company_id: user.company, filter });

    return response.json(classToClass(users));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { id } = request.params;

    const showUser = container.resolve(ShowUsersService);
    const result = await showUser.execute({ company_id: user.company, filter: { id } });

    return response.json(classToClass(result.shift()))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { name, email, password, roles } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password, companyId: company, roles });

    return response.status(201).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, name, email, password, old_password, roles } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({ id, name, email, password, old_password, company, roles });

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: userId, company } = request.user;
    const { id } = request.params;

    if (id === userId) {
      throw new AppError("You don't have permission to delete yourself");
    }

    const deleteUser = container.resolve(DeleteUserService);

    const user = await deleteUser.execute({ id, company });

    return response.json(classToClass(user));
  }
}
