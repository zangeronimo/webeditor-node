import ICreateCategoryDTO from "@domain/dtos/mkt/ICreateCategoryDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import ICategoriesRepository from "@domain/interfaces/mkt/ICategoriesRepository";
import Category from "@infra/typeorm/entities/mkt/Category";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type CategoryFilter = {
  id?: string;
  name?: string;
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

    builder.where('categories.companyId = :co', { co: companyId});

    if (filter.name)
      builder.andWhere("unaccent(lower(categories.name)) LIKE unaccent(:s1)", {s1: `%${filter.name.toLowerCase()}%`})
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
    });
    return findCategory;
  }

  public async findBySlug(companyId: string, slug: string): Promise<Category | undefined> {
    const findCategory = await this.ormRepository.findOne({
      where: {
        slug,
        companyId,
        deletedAt: null,
      },
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
    });
    return findCategory;
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
