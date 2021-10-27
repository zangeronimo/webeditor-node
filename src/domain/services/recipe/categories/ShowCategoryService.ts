import ICategoriesRepository from '@domain/interfaces/recipe/ICategoriesRepository';
import Category from '@infra/typeorm/entities/recipe/Category';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  companyId: string;
}

@injectable()
class ShowCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute({ companyId }: IRequest): Promise<Category[]> {
    const categories = await this.categoriesRepository.findAll(companyId);
    return categories;
  }
}

export default ShowCategoryService;
