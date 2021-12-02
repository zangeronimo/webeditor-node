import IRecipesRepository from '@domain/interfaces/recipe/IRecipesRepository';
import Recipe from '@infra/typeorm/entities/recipe/Recipe';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
  category_id: string;
}

@injectable()
class ShowRecipesByCategoryService {
  constructor(
    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute({ company_id, category_id }: IRequest): Promise<Recipe[]> {
    return await this.recipesRepository.findByCategory(category_id, company_id);
  }
}

export default ShowRecipesByCategoryService;
