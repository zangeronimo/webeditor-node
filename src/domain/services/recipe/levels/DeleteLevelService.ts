import ILevelsRepository from "@domain/interfaces/recipe/ILevelsRepository";
import AppError from "@infra/errors/AppError";
import Level from "@infra/typeorm/entities/recipe/Level";

interface IRequest {
  id: string;
  companyId: string;
}

class DeleteLevelService {
  constructor(
    private levelsRepository: ILevelsRepository,
  ) { }

  public async execute(model: IRequest): Promise<Level> {
    const level = await this.levelsRepository.findById(model.id, model.companyId);

    if (!level || level.companyId !== model.companyId) {
      throw new AppError('Level not found');
    }

    level.deletedAt = new Date();

    return this.levelsRepository.save(level);
  }
}

export default DeleteLevelService;
