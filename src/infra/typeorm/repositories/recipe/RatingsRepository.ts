import ICreateRateDTO from "@domain/dtos/recipe/ICreateRateDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import IRatingsRepository from "@domain/interfaces/recipe/IRatingsRepository";
import Rate from "@infra/typeorm/entities/recipe/Rate";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type RateFilter = {
  id?: string;
  rate?: string;
  recipeId?: string;
  active?: 0 | 1 | 2;
}

class RatingsRepository implements IRatingsRepository {
  private ormRepository: Repository<Rate>;

  constructor() {
    this.ormRepository = getRepository(Rate);
  }

  public async findAll(companyId: string, paginate: any, filter: RateFilter, order: OrderBy): Promise<IPaginationResponse<Rate>> {

    const builder = this.ormRepository.createQueryBuilder('ratings');
    builder.innerJoinAndSelect('ratings.company', 'company');
    builder.innerJoinAndSelect('ratings.recipe', 'recipe');

    builder.where('ratings.companyId = :co', { co: companyId});

    if (filter.rate)
      builder.andWhere("ratings.rate = :s1", {s1: filter.rate});
    if (filter.recipeId)
      builder.andWhere("ratings.recipeId = :s2", {s2: filter.recipeId});
    if (filter.active)
      builder.andWhere("ratings.active = :s3", {s3: filter.active});

    builder.orderBy(`ratings.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
  }

  public async findById(id: string, companyId: string): Promise<Rate | undefined> {
    const findRate = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
      relations: ['recipe'],
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
