import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import AppError from "@infra/errors/AppError";
import IStorageProvider from "@infra/providers/StorageProvider/models/IStorageProvider";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  file: string;
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

    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
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

    const updatedRecipe =  await this.recipesRepository.save(recipe);

    const imgUrl = await this.storageProvider.saveFile(model.file, `${recipe.companyId}/recipes`);
    if (imgUrl) {
      await this.imagesRepository.create({ recipeId: recipe.id, url: imgUrl, companyId: recipe.companyId});
    }

    return updatedRecipe;
  }
}

export default UpdateRecipeService;
