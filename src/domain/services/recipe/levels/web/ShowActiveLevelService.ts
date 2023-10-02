import { IPaginationResponse } from '@domain/interfaces/Base';
import ILevelsRepository from '@domain/interfaces/recipe/ILevelsRepository';
import Level from '@infra/typeorm/entities/recipe/Level';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { LevelFilter } from '@infra/typeorm/repositories/recipe/LevelsRepository';

interface IRequest {
  company_id: string;
}

class ShowActiveLevelService {
  constructor(
    private levelsRepository: ILevelsRepository,
  ) { }

  public async execute({ company_id }: IRequest): Promise<Level[]> {
    const levels = await this.levelsRepository.findActive(company_id);
    return levels;
  }
}

export default ShowActiveLevelService;
