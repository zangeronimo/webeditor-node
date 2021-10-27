import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import AppError from "@infra/errors/AppError";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  companyId: string;
}

@injectable()
class DeleteRecipeService {
  constructor(
    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Recipe> {
    const recipe = await this.recipesRepository.findById(model.id, model.companyId);

    if (!recipe || recipe.companyId !== model.companyId) {
      throw new AppError('Recipe not found');
    }

    recipe.deletedAt = new Date();

    return this.recipesRepository.save(recipe);
  }
}

export default DeleteRecipeService;
