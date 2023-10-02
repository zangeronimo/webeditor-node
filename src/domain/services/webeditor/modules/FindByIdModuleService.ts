import IModulesRepository from '@domain/interfaces/webeditor/IModulesRepository';
import Module from '@infra/typeorm/entities/webeditor/Module';

class FindByIdModuleService {
  constructor(
    private modulesRepository: IModulesRepository,
  ) { }

  public async execute(id: string): Promise<Module | undefined> {
    return await this.modulesRepository.findById(id);
  }
}

export default FindByIdModuleService;
