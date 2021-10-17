import ICreateRecipeDTO from "@domain/dtos/recipe/ICreateRecipeDTO";
import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";
import { getRepository, Repository } from "typeorm";

class RecipesRepository implements IRecipesRepository {
  private ormRepository: Repository<Recipe>;

  constructor() {
    this.ormRepository = getRepository(Recipe);
  }

  public async findAll(companyId: string): Promise<Recipe[]> {
    const findRecipes = await this.ormRepository.find({
      where: {
        companyId,
        deletedAt: null
      },
    });
    return findRecipes;
  }

  public async findById(id: string, companyId: string): Promise<Recipe | undefined> {
    const findRecipe = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
    });
    return findRecipe;
  }

  public async findByCategory(categoryId: string, companyId: string): Promise<Recipe[]> {
    const findRecipes = await this.ormRepository.find({
      where: {
        categoryId,
        companyId,
        deletedAt: null,
      },
    });
    return findRecipes;
  }

  public async create(model: ICreateRecipeDTO): Promise<Recipe> {
    const recipe = this.ormRepository.create(model);
    await this.ormRepository.save(recipe);

    return recipe;
  }

  public async save(recipe: Recipe): Promise<Recipe> {
    return this.ormRepository.save(recipe);
  }
}

export default RecipesRepository;
