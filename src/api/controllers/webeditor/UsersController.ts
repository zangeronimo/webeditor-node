import { ICreateUserService } from "@domain/interfaces/services/webeditor/ICreateUserService";
import { IFindUserByIdService } from "@domain/interfaces/services/webeditor/IFindUserByIdService";
import { IShowUsersService } from "@domain/interfaces/services/webeditor/IShowUsersService";
import { IUpdateUserService } from "@domain/interfaces/services/webeditor/IUpdateUserService";
import AppError from "@infra/errors/AppError";
import { UserFilter } from "@infra/typeorm/repositories/webeditor/UsersRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";

export class UsersController {
  constructor(
    readonly showUsersService: IShowUsersService, 
    readonly findUserService: IFindUserByIdService,
    readonly createUserService: ICreateUserService,
    readonly updateUserService: IUpdateUserService) { }

  public getAll = async(request: Request, response: Response): Promise<Response> => {
    const { name, order, page } = request.query;
    const { user } = request;
    const users = await this.showUsersService.execute({companyId: user.company, paginate: { page }, filter: { name } as UserFilter, order: order && JSON.parse(order?.toString())});
    return response.json(classToClass(users));
  }

  public getById = async(request: Request, response: Response): Promise<Response> => {
    const { user } = request;
    const { id } = request.params;
    const result = await this.findUserService.execute(id, user.company);
    return response.json(classToClass(result))
  }

  public create = async(request: Request, response: Response): Promise<Response> => {
    const { company } = request.user;
    const { name, email, password, roles } = request.body;
    const user = await this.createUserService.execute({ name, email, password, companyId: company, roles });
    return response.status(201).json(classToClass(user));
  }

  public update = async(request: Request, response: Response): Promise<Response> => {
    const { company } = request.user;
    const { id, name, email, password, roles } = request.body;
    const user = await this.updateUserService.execute({ id, name, email, password, companyId: company, roles });
    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: userId, company } = request.user;
    const { id } = request.params;

    if (id === userId) {
      throw new AppError("You don't have permission to delete yourself");
    }

    // const deleteUser = container.resolve(DeleteUserService);

    // const user = await deleteUser.execute({ id, company });

    return response.json(classToClass(null));
  }
}
