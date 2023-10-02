import ICategoriesRepository from '@domain/interfaces/mkt/ICategoriesRepository';
import Category from '@infra/typeorm/entities/mkt/Category';

interface IRequest {
  company_id: string;
}

class ShowActiveCategoriesService {
  constructor(
    private categoriesRepository: ICategoriesRepository,
  ) { }

  public async execute({ company_id }: IRequest): Promise<Category[]> {
    const categories = await this.categoriesRepository.findActive(company_id);
    return categories;
  }
}

export default ShowActiveCategoriesService;
