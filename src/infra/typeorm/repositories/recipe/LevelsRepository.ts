import ICreateLevelDTO from "@domain/dtos/recipe/ICreateLevelDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import ILevelsRepository from "@domain/interfaces/recipe/ILevelsRepository";
import Level from "@infra/typeorm/entities/recipe/Level";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type LevelFilter = {
  id?: string;
  name?: string;
  active?: 0 | 1;
}

class LevelsRepository implements ILevelsRepository {
  private ormRepository: Repository<Level>;

  constructor() {
    this.ormRepository = getRepository(Level);
  }

  public async findAll(companyId: string, paginate: any, filter: LevelFilter, order: OrderBy): Promise<IPaginationResponse<Level>> {

    const builder = this.ormRepository.createQueryBuilder('levels');
    builder.innerJoinAndSelect('levels.company', 'company');

    builder.where('levels.companyId = :s', { s: companyId});

    if (filter.name)
      builder.where("unaccent(lower(levels.name)) LIKE unaccent(:s)", {s: `%${filter.name.toLowerCase()}%`})
    if (filter.active)
      builder.where("levels.active = :s", {s: filter.active});

    builder.orderBy(`levels.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
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
