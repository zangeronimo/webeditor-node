import ICreateRecipeDTO from "@domain/dtos/recipe/ICreateRecipeDTO";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";

export default interface IRecipesRepository {
  findAll(company_id: string): Promise<Recipe[]>;
  findById(id: string, company_id: string): Promise<Recipe | undefined>;
  findByCategory(category_id: string, company_id: string): Promise<Recipe[]>;
  create(data: ICreateRecipeDTO): Promise<Recipe>;
  save(recipe: Recipe): Promise<Recipe>;
}
