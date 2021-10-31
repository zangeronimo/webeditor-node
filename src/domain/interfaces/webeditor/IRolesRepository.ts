import ICreateRoleDTO from "@domain/dtos/webeditor/ICreateRoleDTO";
import { IPaginationResponse } from "@domain/services/webeditor/roles/ShowRoleService";
import Role from "@infra/typeorm/entities/webeditor/Role";
import { OrderBy, RoleFilter } from "@infra/typeorm/repositories/webeditor/RolesRepository";

export default interface IRolesRepository {
  findAll(paginate: any, filter: RoleFilter, order: OrderBy): Promise<IPaginationResponse>;
  findById(id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
  save(role: Role): Promise<Role>;
}
