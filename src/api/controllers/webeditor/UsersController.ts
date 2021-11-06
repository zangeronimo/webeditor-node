import CreateUserService from "@domain/services/webeditor/users/CreateUserService";
import DeleteUserService from "@domain/services/webeditor/users/DeleteUserService";
import FindByIdUserService from "@domain/services/webeditor/users/FindByIdUserService";
import ShowUsersService from "@domain/services/webeditor/users/ShowUserService";
import UpdateUserService from "@domain/services/webeditor/users/UpdateUserService";
import AppError from "@infra/errors/AppError";
import { UserFilter } from "@infra/typeorm/repositories/webeditor/UsersRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UsersController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { name, order, page } = request.query;
    const { user } = request;

    const showUsers = container.resolve(ShowUsersService);
    const users = await showUsers.execute({company_id: user.company, paginate: { page }, filter: { name } as UserFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(users));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { id } = request.params;

    const getUser = container.resolve(FindByIdUserService);
    const result = await getUser.execute(id, user.company);

    return response.json(classToClass(result))
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
    const { id, name, email, password, roles } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({ id, name, email, password, company, roles });

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
