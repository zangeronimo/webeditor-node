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

    builder.where('levels.companyId = :co', { co: companyId});

    if (filter.name)
      builder.andWhere("unaccent(lower(levels.name)) LIKE unaccent(:s1)", {s1: `%${filter.name.toLowerCase()}%`})
    if (filter.active)
      builder.andWhere("levels.active = :s2", {s2: filter.active});

    builder.orderBy(`levels.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
  }

  public async findActive(companyId: string): Promise<Level[]> {
    const findLevel = await this.ormRepository.find({
      where: {
        active: 1,
        companyId,
        deletedAt: null,
      },
      relations: ['categories']
    });
    return findLevel;
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

  public async findBySlug(slug: string, companyId: string): Promise<Level | undefined> {
    const findLevel = await this.ormRepository.findOne({
      where: {
        slug,
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
