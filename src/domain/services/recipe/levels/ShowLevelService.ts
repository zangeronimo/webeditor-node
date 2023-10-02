import { IPaginationResponse } from '@domain/interfaces/Base';
import ILevelsRepository from '@domain/interfaces/recipe/ILevelsRepository';
import Level from '@infra/typeorm/entities/recipe/Level';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { LevelFilter } from '@infra/typeorm/repositories/recipe/LevelsRepository';

interface IRequest {
  company_id: string;
  paginate?: any;
  filter?: LevelFilter;
  order?: OrderBy;
}

class ShowLevelService {
  constructor(
    private levelsRepository: ILevelsRepository,
  ) { }

  public async execute({ company_id, paginate, filter = {}, order = { field: 'name', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<Level>> {
    const levels = await this.levelsRepository.findAll(company_id, paginate, filter, order);
    return levels;
  }
}

export default ShowLevelService;
