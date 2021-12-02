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

    builder.where('recipes.companyId = :co', { co: companyId});

    if (filter.slug)
      builder.andWhere("unaccent(lower(recipes.slug)) LIKE unaccent(:rs)", {rs: `%${filter.slug.toLowerCase()}%`})
    if (filter.name)
      builder.andWhere("unaccent(lower(recipes.name)) LIKE unaccent(:rn)", {rn: `%${filter.name.toLowerCase()}%`})
    if (filter.categoryId)
      builder.andWhere("recipes.categoryId = :rc", {rc: filter.categoryId});
    if (filter.active)
      builder.andWhere("recipes.active = :ra", {ra: filter.active});

    builder.orderBy(`recipes.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
  }

  public async findAllImg(companyId: string, name = ''): Promise<Recipe[]> {

    const builder = this.ormRepository.createQueryBuilder('recipes');
    builder.innerJoinAndSelect('recipes.company', 'company');
    builder.innerJoinAndSelect('recipes.category', 'category');
    builder.innerJoinAndSelect('recipes.images', 'images');
    builder.leftJoinAndSelect('recipes.ratings', 'ratings');

    if (name)
    builder.where("unaccent(lower(recipes.name)) LIKE unaccent(:rn)", {rn: `%${name.toLowerCase()}%`})

    builder.andWhere('recipes.companyId = :co', { co: companyId});
    builder.andWhere('images.active = :s1', { s1: 1 });
    builder.andWhere('recipes.active = :s3', { s3: 1 });

    builder.orderBy('RANDOM()');

    return await builder.getMany();
  }

  public async findAllCategoryImg(companyId: string, categoryId: string): Promise<Recipe[]> {

    const builder = this.ormRepository.createQueryBuilder('recipes');
    builder.innerJoinAndSelect('recipes.company', 'company');
    builder.innerJoinAndSelect('recipes.category', 'category');
    builder.innerJoinAndSelect('recipes.images', 'images');
    builder.leftJoinAndSelect('recipes.ratings', 'ratings');

    builder.where('company.id = :co', { co: companyId });
    builder.andWhere('category.id = :ca', { ca: categoryId });
    builder.andWhere('images.active = :s1', { s1: 1 });
    builder.andWhere('recipes.active = :s2', { s2: 1 });

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

  public async findAllBySlug(companyId: string, slug: string): Promise<Recipe | undefined> {
    const findRecipe = await this.ormRepository.findOne({
      where: {
        slug,
        companyId,
        deletedAt: null,
      },
      relations: ['category', 'category.level', 'images'],
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
      relations: ['ratings'],
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
