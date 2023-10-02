import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import AppError from "@infra/errors/AppError";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";

interface IRequest {
  id: string;
  companyId: string;
}

class DeleteRecipeService {
  constructor(
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Recipe> {
    const recipe = await this.recipesRepository.findById(model.id, model.companyId);

    if (!recipe || recipe.companyId !== model.companyId) {
      throw new AppError('Recipe not found');
    }

    const now = new Date();
    recipe.slug = now.getTime().toString();
    recipe.deletedAt = now;

    return this.recipesRepository.save(recipe);
  }
}

export default DeleteRecipeService;
