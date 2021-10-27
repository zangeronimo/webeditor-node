import IRecipesRepository from '@domain/interfaces/recipe/IRecipesRepository';
import Recipe from '@infra/typeorm/entities/recipe/Recipe';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  companyId: string;
}

@injectable()
class ShowRecipeService {
  constructor(
    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute({ companyId }: IRequest): Promise<Recipe[]> {
    const recipes = await this.recipesRepository.findAll(companyId);
    return recipes;
  }
}

export default ShowRecipeService;
