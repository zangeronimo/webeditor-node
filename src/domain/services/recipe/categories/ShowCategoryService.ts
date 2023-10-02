import { IPaginationResponse } from '@domain/interfaces/Base';
import ICategoriesRepository from '@domain/interfaces/recipe/ICategoriesRepository';
import Category from '@infra/typeorm/entities/recipe/Category';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { CategoryFilter } from '@infra/typeorm/repositories/recipe/CategoriesRepository';

interface IRequest {
  company_id: string;
  paginate?: any;
  filter?: CategoryFilter;
  order?: OrderBy;
}

class ShowCategoryService {
  constructor(
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute({ company_id, paginate, filter = {}, order = { field: 'name', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<Category>> {
    const categories = await this.categoriesRepository.findAll(company_id, paginate, filter, order);
    return categories;
  }
}

export default ShowCategoryService;
