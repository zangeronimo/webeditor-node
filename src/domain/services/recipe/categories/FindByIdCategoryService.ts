import ICategoriesRepository from '@domain/interfaces/recipe/ICategoriesRepository';
import Category from '@infra/typeorm/entities/recipe/Category';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindByIdCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<Category | undefined> {
    return await this.categoriesRepository.findById(id, company_id);
  }
}

export default FindByIdCategoryService;
