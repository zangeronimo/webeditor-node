import ICreateModuleDTO from "@domain/dtos/webeditor/ICreateModuleDTO";
import Module from "@infra/typeorm/entities/webeditor/Module";

export default interface IModulesRepository {
  findAll(): Promise<Module[]>;
  findById(id: string): Promise<Module | undefined>;
  findByName(name: string): Promise<Module | undefined>;
  create(data: ICreateModuleDTO): Promise<Module>;
  save(module: Module): Promise<Module>;
}
