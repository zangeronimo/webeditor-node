import ICategoriesRepository from '@domain/interfaces/mkt/ICategoriesRepository';
import AppError from '@infra/errors/AppError';
import Category from '@infra/typeorm/entities/mkt/Category';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
  slug: string;
}

@injectable()
class ShowCategoryBySlug {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute({ company_id, slug }: IRequest): Promise<Category | undefined> {
    const category = await this.categoriesRepository.findBySlug(company_id, slug);
    return category;
  }
}

export default ShowCategoryBySlug;
