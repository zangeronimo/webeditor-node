import CreateRoleService from "@domain/services/webeditor/roles/CreateRoleService";
import DeleteRoleService from "@domain/services/webeditor/roles/DeleteRoleService";
import FindByIdRoleService from "@domain/services/webeditor/roles/FindByIdRoleService";
import ShowRoleService from "@domain/services/webeditor/roles/ShowRoleService";
import UpdateOrderService from "@domain/services/webeditor/roles/UpdateOrderService";
import UpdateRoleService from "@domain/services/webeditor/roles/UpdateRoleService";
import { RoleFilter } from "@infra/typeorm/repositories/webeditor/RolesRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class RolesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { search, moduleId, order, page } = request.query;

    const showRoles = container.resolve(ShowRoleService);
    const roles = await showRoles.execute({paginate: { page }, filter: { search, moduleId } as RoleFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(roles));
  }
  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findRole = container.resolve(FindByIdRoleService);
    const result = await findRole.execute(id);

    return response.json(classToClass(result));
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

  public async updateOrder(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { order } = request.body;

    const updateOrder = container.resolve(UpdateOrderService);
    const role = await updateOrder.execute({ id, order });

    return response.json(classToClass(role));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteRole = container.resolve(DeleteRoleService);
    const result = await deleteRole.execute({ id });

    return response.json(classToClass(result));
  }
}
