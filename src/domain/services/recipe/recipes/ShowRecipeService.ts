import { IPaginationResponse } from '@domain/interfaces/Base';
import IRecipesRepository from '@domain/interfaces/recipe/IRecipesRepository';
import Recipe from '@infra/typeorm/entities/recipe/Recipe';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { RecipeFilter } from '@infra/typeorm/repositories/recipe/RecipiesRepository';

interface IRequest {
  company_id: string;
  paginate?: any;
  filter?: RecipeFilter;
  order?: OrderBy;
}

class ShowRecipeService {
  constructor(
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute({ company_id, paginate, filter = {}, order = { field: 'name', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<Recipe>> {
    const recipes = await this.recipesRepository.findAll(company_id, paginate, filter, order);
    return recipes;
  }
}

export default ShowRecipeService;
