import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";
import { inject, injectable } from "tsyringe";

interface IRequest {
  slug: string;
  name: string;
  ingredients: string;
  preparation: string;
  active: 0 | 1;
  categoryId: string;
  companyId: string;
}

@injectable()
class CreateRecipeService {
  constructor(
    @inject('RecipesRepository')
    private recipesRepository: IRecipesRepository,
  ) { }

  public async execute({ slug, name, ingredients, preparation, active, categoryId, companyId }: IRequest): Promise<Recipe> {
    const recipe = await this.recipesRepository.create({slug, name, ingredients, preparation, active, categoryId, companyId});
    return recipe;
  }
}

export default CreateRecipeService;
