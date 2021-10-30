import ICreateRoleDTO from "@domain/dtos/webeditor/ICreateRoleDTO";
import Role from "@infra/typeorm/entities/webeditor/Role";
import { OrderBy, RoleFilter } from "@infra/typeorm/repositories/webeditor/RolesRepository";

export default interface IRolesRepository {
  findAll(filter: RoleFilter, order: OrderBy): Promise<Role[]>;
  findById(id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
  save(role: Role): Promise<Role>;
}
