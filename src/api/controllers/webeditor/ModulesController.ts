import CreateModuleService from "@domain/services/webeditor/modules/CreateModuleService";
import DeleteModuleService from "@domain/services/webeditor/modules/DeleteModuleService";
import FindByIdModuleService from "@domain/services/webeditor/modules/FindByIdModuleService";
import ShowModuleService from "@domain/services/webeditor/modules/ShowModuleService";
import UpdateModuleService from "@domain/services/webeditor/modules/UpdateModuleService";
import UserModuleService from "@domain/services/webeditor/modules/UserModuleService";
import { ModuleFilter } from "@infra/typeorm/repositories/webeditor/ModulesRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ModulesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { name, order, page } = request.query;

    const showModules = container.resolve(ShowModuleService);

    const modules = await showModules.execute({paginate: { page }, filter: { name } as ModuleFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(modules));
  }
  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findModule = container.resolve(FindByIdModuleService);
    const result = await findModule.execute(id);

    return response.json(classToClass(result));
  }
  public async getAllByUser(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const showModules = container.resolve(UserModuleService);

    const modules = await showModules.execute(user.company);

    return response.json(classToClass(modules));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createModule = container.resolve(CreateModuleService);

    const module = await createModule.execute({ name });

    return response.status(201).json(classToClass(module));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name } = request.body;

    const updateModule = container.resolve(UpdateModuleService);

    const module = await updateModule.execute({ id, name });

    return response.json(classToClass(module));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteModule = container.resolve(DeleteModuleService);

    const result = await deleteModule.execute({ id });

    return response.json(classToClass(result));
  }
}
