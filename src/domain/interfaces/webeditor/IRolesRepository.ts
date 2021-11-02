import ICreateRoleDTO from "@domain/dtos/webeditor/ICreateRoleDTO";
import Role from "@infra/typeorm/entities/webeditor/Role";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { RoleFilter } from "@infra/typeorm/repositories/webeditor/RolesRepository";
import { IPaginationResponse } from "../Base";

export default interface IRolesRepository {
  findAll(paginate: any, filter: RoleFilter, order: OrderBy): Promise<IPaginationResponse<Role>>;
  findById(id: string): Promise<Role | undefined>;
  findByName(name: string): Promise<Role | undefined>;
  create(data: ICreateRoleDTO): Promise<Role>;
  save(role: Role): Promise<Role>;
}
