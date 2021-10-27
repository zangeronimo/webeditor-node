import ILevelsRepository from '@domain/interfaces/recipe/ILevelsRepository';
import Level from '@infra/typeorm/entities/recipe/Level';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  companyId: string;
}

@injectable()
class ShowLevelService {
  constructor(
    @inject('LevelsRepository')
    private levelsRepository: ILevelsRepository,
  ) { }

  public async execute({ companyId }: IRequest): Promise<Level[]> {
    const levels = await this.levelsRepository.findAll(companyId);
    return levels;
  }
}

export default ShowLevelService;
