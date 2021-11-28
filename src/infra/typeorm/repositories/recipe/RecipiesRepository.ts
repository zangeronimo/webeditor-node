import ICreateRecipeDTO from "@domain/dtos/recipe/ICreateRecipeDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import Recipe from "@infra/typeorm/entities/recipe/Recipe";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type RecipeFilter = {
  id?: string;
  slug?: string;
  name?: string;
  categoryId?: string;
  active?: 0 | 1;
}

class RecipesRepository implements IRecipesRepository {
  private ormRepository: Repository<Recipe>;

  constructor() {
    this.ormRepository = getRepository(Recipe);
  }

  public async findAll(companyId: string, paginate: any, filter: RecipeFilter, order: OrderBy): Promise<IPaginationResponse<Recipe>> {

    const builder = this.ormRepository.createQueryBuilder('recipes');
    builder.innerJoinAndSelect('recipes.company', 'company');
    builder.innerJoinAndSelect('recipes.category', 'category');

    builder.where('recipes.companyId = :s', { s: companyId});

    if (filter.slug)
      builder.where("unaccent(lower(recipes.slug)) LIKE unaccent(:s)", {s: `%${filter.slug.toLowerCase()}%`})
    if (filter.name)
      builder.where("unaccent(lower(recipes.name)) LIKE unaccent(:s)", {s: `%${filter.name.toLowerCase()}%`})
    if (filter.categoryId)
      builder.where("recipes.categoryId = :s", {s: filter.categoryId});
    if (filter.active)
      builder.where("recipes.active = :s", {s: filter.active});

    builder.orderBy(`recipes.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
  }

  public async findAllImg(companyId: string): Promise<Recipe[]> {

    const builder = this.ormRepository.createQueryBuilder('recipes');
    builder.innerJoinAndSelect('recipes.company', 'company');
    builder.innerJoinAndSelect('recipes.category', 'category');
    builder.innerJoinAndSelect('recipes.images', 'images');
    builder.leftJoinAndSelect('recipes.ratings', 'ratings');

    builder.where('recipes.companyId = :s', { s: companyId});
    builder.where('images.active = :s', { s: 1 });
    builder.where('ratings.active = :s', { s: 1 });
    builder.where('recipes.active = :s', { s: 1 });

    builder.orderBy('RANDOM()');

    return await builder.getMany();
  }

  public async findById(id: string, companyId: string): Promise<Recipe | undefined> {
    const findRecipe = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
      relations: ['category', 'images'],
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
