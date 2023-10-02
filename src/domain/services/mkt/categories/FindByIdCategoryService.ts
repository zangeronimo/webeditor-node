import ICategoriesRepository from '@domain/interfaces/mkt/ICategoriesRepository';
import Category from '@infra/typeorm/entities/mkt/Category';

class FindByIdCategoryService {
  constructor(
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<Category | undefined> {
    return await this.categoriesRepository.findById(id, company_id);
  }
}

export default FindByIdCategoryService;
