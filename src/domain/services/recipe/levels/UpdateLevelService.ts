import ILevelsRepository from "@domain/interfaces/recipe/ILevelsRepository";
import AppError from "@infra/errors/AppError";
import Level from "@infra/typeorm/entities/recipe/Level";

interface IRequest {
  id: string;
  name: string;
  active: 0 | 1;
  companyId: string;
}

class UpdateLevelService {
  constructor(
    private levelsRepository: ILevelsRepository,
  ) { }

  public async execute(model: IRequest): Promise<Level> {
    const level = await this.levelsRepository.findById(model.id, model.companyId);

    if (!level || level.companyId !== model.companyId) {
      throw new AppError('Level not found');
    }

    level.name = model.name;
    level.active = model.active;

    return this.levelsRepository.save(level);
  }
}

export default UpdateLevelService;
