import ICreateLevelDTO from "@domain/dtos/recipe/ICreateLevelDTO";
import ILevelsRepository from "@domain/interfaces/recipe/ILevelsRepository";
import Level from "@infra/typeorm/entities/recipe/Level";
import { getRepository, Repository } from "typeorm";

class LevelsRepository implements ILevelsRepository {
  private ormRepository: Repository<Level>;

  constructor() {
    this.ormRepository = getRepository(Level);
  }

  public async findAll(companyId: string): Promise<Level[]> {
    const findLevels = await this.ormRepository.find({
      where: {
        companyId,
        deletedAt: null
      },
    });
    return findLevels;
  }

  public async findById(id: string, companyId: string): Promise<Level | undefined> {
    const findLevel = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
    });
    return findLevel;
  }

  public async create(model: ICreateLevelDTO): Promise<Level> {
    const level = this.ormRepository.create(model);
    await this.ormRepository.save(level);

    return level;
  }

  public async save(level: Level): Promise<Level> {
    return this.ormRepository.save(level);
  }
}

export default LevelsRepository;
