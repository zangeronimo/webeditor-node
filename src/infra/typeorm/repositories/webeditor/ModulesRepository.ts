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
      order: {'name': 'ASC'},
      relations: ['roles'],
    });
    return findModules;
  }

  public async findAllByCompany(company_id: string): Promise<Module[]> {
    const builder = this.ormRepository.createQueryBuilder('modules');
    builder.leftJoinAndSelect('modules.roles', 'roles');
    builder.innerJoin('modules.companies', 'companies', "companies.id = :s", {s: company_id});
    builder.where("modules.deletedAt IS NULL");
    builder.orderBy("modules.name");

    return await builder.getMany();
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
