import IRecipesRepository from '@domain/interfaces/recipe/IRecipesRepository';
import Recipe from '@infra/typeorm/entities/recipe/Recipe';

interface IRequest {
  company_id: string;
  category_id: string;
}

class ShowRecipesByCategoryService {
  constructor(
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute({ company_id, category_id }: IRequest): Promise<Recipe[]> {
    return await this.recipesRepository.findByCategory(category_id, company_id);
  }
}

export default ShowRecipesByCategoryService;
