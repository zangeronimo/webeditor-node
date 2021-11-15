import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import AppError from "@infra/errors/AppError";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  name: string;
  ingredients: string;
  preparation: string;
  active: 0 | 1;
  categoryId: string;
  companyId: string;
}

@injectable()
class UpdateRecipeService {
  constructor(
    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Recipe> {
    const recipe = await this.recipesRepository.findById(model.id, model.companyId);

    if (!recipe || recipe.companyId !== model.companyId) {
      throw new AppError('Recipe not found');
    }

    recipe.name = model.name;
    recipe.ingredients = model.ingredients;
    recipe.preparation = model.preparation;
    recipe.active = model.active;
    recipe.categoryId = model.categoryId;

    return this.recipesRepository.save(recipe);
  }
}

export default UpdateRecipeService;
