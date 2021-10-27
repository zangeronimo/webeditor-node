import ICreateRateDTO from "@domain/dtos/recipe/ICreateRateDTO";
import IRatingsRepository from "@domain/interfaces/recipe/IRatingsRepository";
import Rate from "@infra/typeorm/entities/recipe/Rate";
import { getRepository, Repository } from "typeorm";

class RatingsRepository implements IRatingsRepository {
  private ormRepository: Repository<Rate>;

  constructor() {
    this.ormRepository = getRepository(Rate);
  }

  public async findAll(companyId: string): Promise<Rate[]> {
    const findRatings = await this.ormRepository.find({
      where: {
        companyId,
        deletedAt: null
      },
    });
    return findRatings;
  }

  public async findById(id: string, companyId: string): Promise<Rate | undefined> {
    const findRate = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
    });
    return findRate;
  }

  public async findByRecipe(recipeId: string, companyId: string): Promise<Rate[]> {
    const findRatings = await this.ormRepository.find({
      where: {
        recipeId,
        companyId,
        deletedAt: null,
      },
    });
    return findRatings;
  }

  public async create(model: ICreateRateDTO): Promise<Rate> {
    const rate = this.ormRepository.create(model);
    await this.ormRepository.save(rate);

    return rate;
  }

  public async save(rate: Rate): Promise<Rate> {
    return this.ormRepository.save(rate);
  }
}

export default RatingsRepository;
