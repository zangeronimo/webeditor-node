import ICreateCategoryDTO from "@domain/dtos/recipe/ICreateCategoryDTO";
import ICategoriesRepository from "@domain/interfaces/recipe/ICategoriesRepository";
import Category from "@infra/typeorm/entities/recipe/Category";
import { getRepository, Repository } from "typeorm";

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async findAll(companyId: string): Promise<Category[]> {
    const findCategories = await this.ormRepository.find({
      where: {
        companyId,
        deletedAt: null
      },
    });
    return findCategories;
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
