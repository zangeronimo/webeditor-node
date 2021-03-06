import ICreateCategoryDTO from "@domain/dtos/recipe/ICreateCategoryDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import ICategoriesRepository from "@domain/interfaces/recipe/ICategoriesRepository";
import Category from "@infra/typeorm/entities/recipe/Category";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type CategoryFilter = {
  id?: string;
  name?: string;
  levelId?: string;
  active?: 0 | 1;
}

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAll(companyId: string, paginate: any, filter: CategoryFilter, order: OrderBy): Promise<IPaginationResponse<Category>> {

    const builder = this.ormRepository.createQueryBuilder('categories');
    builder.innerJoinAndSelect('categories.company', 'company');
    builder.innerJoinAndSelect('categories.level', 'level');

    builder.where('categories.companyId = :co', { co: companyId});

    if (filter.name)
      builder.andWhere("unaccent(lower(categories.name)) LIKE unaccent(:s1)", {s1: `%${filter.name.toLowerCase()}%`})
    if (filter.levelId)
      builder.andWhere("categories.levelId = :s2", {s2: filter.levelId});
    if (filter.active)
      builder.andWhere("categories.active = :s3", {s3: filter.active});

    builder.orderBy(`categories.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
  }

  public async findById(id: string, companyId: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
      relations: ['level'],
    });
    return findCategory;
  }

  public async findBySlug(companyId: string, levelId: string, slug: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: {
        slug,
        levelId,
        companyId,
        deletedAt: null,
      },
      relations: ['level'],
    });
    return findCategory;
  }

  public async findActive(companyId: string): Promise<Category[]> {
    const findCategory = await this.ormRepository.find({
      where: {
        active: 1,
        companyId,
        deletedAt: null,
      },
      relations: ['levels']
    });
    return findCategory;
  }

  public async findByLevel(levelId: string, companyId: string): Promise<Category[]> {
    const findCategories = await this.ormRepository.find({
      where: {
        levelId,
        companyId,
        deletedAt: null,
      },
    });
    return findCategories;
  }

  public async create(model: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create(model);
    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }
}

export default CategoriesRepository;
