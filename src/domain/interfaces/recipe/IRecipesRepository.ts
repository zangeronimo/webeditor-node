import ICreateRecipeDTO from "@domain/dtos/recipe/ICreateRecipeDTO";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { RecipeFilter } from "@infra/typeorm/repositories/recipe/RecipiesRepository";
import { IPaginationResponse } from "../Base";

export default interface IRecipesRepository {
  findAll(company_id: string, paginate: any, filter: RecipeFilter, order: OrderBy): Promise<IPaginationResponse<Recipe>>;
  findAllImg(company_id: string): Promise<Recipe[]>;
  findById(id: string, company_id: string): Promise<Recipe | undefined>;
  findByCategory(category_id: string, company_id: string): Promise<Recipe[]>;
  create(data: ICreateRecipeDTO): Promise<Recipe>;
  save(recipe: Recipe): Promise<Recipe>;
}
