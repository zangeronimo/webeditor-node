import IRecipesRepository from '@domain/interfaces/recipe/IRecipesRepository';
import Recipe from '@infra/typeorm/entities/recipe/Recipe';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindByIdRecipeService {
  constructor(
    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<Recipe | undefined> {
    return await this.recipesRepository.findById(id, company_id);
  }
}

export default FindByIdRecipeService;
