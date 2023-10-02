import ICategoriesRepository from '@domain/interfaces/recipe/ICategoriesRepository';
import ILevelsRepository from '@domain/interfaces/recipe/ILevelsRepository';
import AppError from '@infra/errors/AppError';
import Category from '@infra/typeorm/entities/recipe/Category';

interface IRequest {
  company_id: string;
  level: string;
  slug: string;
}

class ShowCategoryBySlug {
  constructor(
    private categoriesRepository: ICategoriesRepository,
    private levelsRepository: ILevelsRepository,
  ) { }

  public async execute({ company_id, level, slug }: IRequest): Promise<Category | undefined> {
    const levelFound = await this.levelsRepository.findBySlug(level, company_id);

    if (!levelFound) {
      throw new AppError('Level not found');
    }

    const category = await this.categoriesRepository.findBySlug(company_id, levelFound.id, slug);
    return category;
  }
}

export default ShowCategoryBySlug;
