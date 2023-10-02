import { IPaginationResponse } from '@domain/interfaces/Base';
import IModulesRepository from '@domain/interfaces/webeditor/IModulesRepository';
import Module from '@infra/typeorm/entities/webeditor/Module';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { ModuleFilter } from '@infra/typeorm/repositories/webeditor/ModulesRepository';

interface IRequest {
  paginate?: any;
  filter?: ModuleFilter;
  order?: OrderBy;
}

class ShowModuleService {
  constructor(
    private modulesRepository: IModulesRepository,
  ) { }

  public async execute({paginate, filter = {}, order = { field: 'name', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<Module>> {
    const modules = await this.modulesRepository.findAll(paginate, filter, order);
    return modules;
  }
}

export default ShowModuleService;
