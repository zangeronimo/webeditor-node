import IRecipesRepository from '@domain/interfaces/recipe/IRecipesRepository';
import Recipe from '@infra/typeorm/entities/recipe/Recipe';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
  limit: number;
  name: string;
}

@injectable()
class ShowImgRecipeService {
  constructor(
    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute({ company_id, limit, name }: IRequest): Promise<Recipe[]> {
    const recipes = await this.recipesRepository.findAllImg(company_id, name);
    return recipes.slice(0, limit);
  }
}

export default ShowImgRecipeService;
