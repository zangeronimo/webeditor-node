import CreateRoleService from "@domain/services/webeditor/roles/CreateRoleService";
import DeleteRoleService from "@domain/services/webeditor/roles/DeleteRoleService";
import ShowRoleService from "@domain/services/webeditor/roles/ShowRoleService";
import UpdateRoleService from "@domain/services/webeditor/roles/UpdateRoleService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class RolesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const filter = request.query;

    const showRoles = container.resolve(ShowRoleService);

    const roles = await showRoles.execute({filter});

    return response.json(classToClass(roles));
  }
  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showRole = container.resolve(ShowRoleService);

    const result = await showRole.execute({ filter: { id } });

    return response.json(classToClass(result.shift()));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, label, module } = request.body;

    const createRole = container.resolve(CreateRoleService);

    const role = await createRole.execute({ name, label, module });

    return response.status(201).json(classToClass(role));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, label, moduleId } = request.body;

    const updateRole = container.resolve(UpdateRoleService);

    const role = await updateRole.execute({ id, name, label, module: moduleId });

    return response.json(classToClass(role));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRole = container.resolve(DeleteRoleService);

    const result = await deleteRole.execute({ id });

    return response.json(classToClass(result));
  }
}
