import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import { slugGenerate } from "@domain/utils/slugGenerate";
import AppError from "@infra/errors/AppError";
import IStorageProvider from "@infra/providers/StorageProvider/models/IStorageProvider";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";
import { inject, injectable } from "tsyringe";

interface IRequest {
  file: string;
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

    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({ file, name, ingredients, preparation, active, categoryId, companyId }: IRequest): Promise<Recipe> {
    const slug = slugGenerate(name);

    const existsRecipe = await this.recipesRepository.findAllBySlug(companyId, slug);
    if (!!existsRecipe) {
      throw new AppError('Ops, já existe uma receita com esse nome.');
    }

    const recipe = await this.recipesRepository.create({slug, name, ingredients, preparation, active, categoryId, companyId});

    const imgUrl = await this.storageProvider.saveFile(file, `${companyId}/recipes`);
    if (imgUrl) {
      await this.imagesRepository.create({ recipeId: recipe.id, url: imgUrl, companyId, active});
    }
    return recipe;
  }
}

export default CreateRecipeService;
