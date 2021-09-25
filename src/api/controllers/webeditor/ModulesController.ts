import CreateModuleService from "@domain/services/webeditor/modules/CreateModuleService";
import DeleteModuleService from "@domain/services/webeditor/modules/DeleteModuleService";
import ShowModuleService from "@domain/services/webeditor/modules/ShowModuleService";
import UpdateModuleService from "@domain/services/webeditor/modules/UpdateModuleService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ModulesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const showModules = container.resolve(ShowModuleService);

    const modules = await showModules.execute();

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
