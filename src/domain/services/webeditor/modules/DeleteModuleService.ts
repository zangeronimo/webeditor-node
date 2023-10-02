import IModulesRepository from "@domain/interfaces/webeditor/IModulesRepository";
import AppError from "@infra/errors/AppError";
import Module from "@infra/typeorm/entities/webeditor/Module";

interface IRequest {
  id: string;
}

class DeleteModuleService {
  constructor(
    private modulesRepository: IModulesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Module> {
    const module = await this.modulesRepository.findById(model.id);

    if (!module) {
      throw new AppError('Module not found');
    }

    module.deletedAt = new Date();

    return this.modulesRepository.save(module);
  }
}

export default DeleteModuleService;
