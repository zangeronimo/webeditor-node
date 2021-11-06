import ICreateModuleDTO from "@domain/dtos/webeditor/ICreateModuleDTO";
import Module from "@infra/typeorm/entities/webeditor/Module";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { ModuleFilter } from "@infra/typeorm/repositories/webeditor/ModulesRepository";
import { IPaginationResponse } from "../Base";

export default interface IModulesRepository {
  findAll(paginate: any, filter: ModuleFilter, order: OrderBy): Promise<IPaginationResponse<Module>>;
  findAllByCompany(company_id: string): Promise<Module[]>;
  findById(id: string): Promise<Module | undefined>;
  findByName(name: string): Promise<Module | undefined>;
  create(data: ICreateModuleDTO): Promise<Module>;
  save(module: Module): Promise<Module>;
}
