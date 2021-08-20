import IModulesRepository from '@domain/interfaces/webeditor/IModulesRepository';
import Module from '@infra/typeorm/entities/webeditor/Module';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowModuleService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) { }

  public async execute(): Promise<Module[]> {
    const modules = await this.modulesRepository.findAll();
    return modules;
  }
}

export default ShowModuleService;
