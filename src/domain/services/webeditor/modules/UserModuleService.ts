import IModulesRepository from '@domain/interfaces/webeditor/IModulesRepository';
import Module from '@infra/typeorm/entities/webeditor/Module';
import { inject, injectable } from 'tsyringe';

@injectable()
class UserModuleService {
  constructor(
    @inject('ModulesRepository')
    private modulesRepository: IModulesRepository,
  ) { }

  public async execute(company_id: string): Promise<Module[]> {
    const modules = await this.modulesRepository.findAllByCompany(company_id);
    return modules;
  }
}

export default UserModuleService;
