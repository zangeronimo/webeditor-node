import ICreateModuleDTO from "@domain/dtos/webeditor/ICreateModuleDTO";
import IModulesRepository from "@domain/interfaces/webeditor/IModulesRepository";
import Module from "@infra/typeorm/entities/webeditor/Module";
import { getRepository, Repository } from "typeorm";

class ModulesRepository implements IModulesRepository {
  private ormRepository: Repository<Module>;

  constructor() {
    this.ormRepository = getRepository(Module);
  }

  public async findAll(): Promise<Module[]> {
    const findModules = await this.ormRepository.find({
      where: {
        deletedAt: null
      },
      relations: ['roles'],
    });
    return findModules;
  }

  public async findById(id: string): Promise<Module | undefined> {
    const findModule = await this.ormRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });
    return findModule;
  }

  public async findByName(name: string): Promise<Module | undefined> {
    const findModule = await this.ormRepository.findOne({
      where: {
        name,
        deletedAt: null,
      }
    });
    return findModule;
  }

  public async create(model: ICreateModuleDTO): Promise<Module> {
    const module = this.ormRepository.create(model);
    await this.ormRepository.save(module);

    return module;
  }

  public async save(module: Module): Promise<Module> {
    return this.ormRepository.save(module);
  }
}

export default ModulesRepository;
