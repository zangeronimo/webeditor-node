import IModulesRepository from "@domain/interfaces/webeditor/IModulesRepository";
import AppError from "@infra/errors/AppError";
import Module from "@infra/typeorm/entities/webeditor/Module";

interface IRequest {
  id: string;
  name: string;
}

class UpdateModuleService {
  constructor(
    private modulesRepository: IModulesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Module> {
    const module = await this.modulesRepository.findById(model.id);

    if (!module) {
      throw new AppError('Module not found');
    }

    const moduleWithUpdatedName = await this.modulesRepository.findByName(model.name);

    if (moduleWithUpdatedName && moduleWithUpdatedName.id !== module.id) {
      throw new AppError('Name already in use.');
    }

    module.name = model.name;

    return this.modulesRepository.save(module);
  }
}

export default UpdateModuleService;
