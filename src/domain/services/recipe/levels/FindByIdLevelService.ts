import ILevelsRepository from '@domain/interfaces/recipe/ILevelsRepository';
import Level from '@infra/typeorm/entities/recipe/Level';

class FindByIdLevelService {
  constructor(
    private levelsRepository: ILevelsRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<Level | undefined> {
    return await this.levelsRepository.findById(id, company_id);
  }
}

export default FindByIdLevelService;
