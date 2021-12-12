import ICategoriesRepository from '@domain/interfaces/mkt/ICategoriesRepository';
import Category from '@infra/typeorm/entities/mkt/Category';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
}

@injectable()
class ShowActiveCategoriesService {
  constructor(
    @inject('MktCategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute({ company_id }: IRequest): Promise<Category[]> {
    const categories = await this.categoriesRepository.findActive(company_id);
    return categories;
  }
}

export default ShowActiveCategoriesService;
