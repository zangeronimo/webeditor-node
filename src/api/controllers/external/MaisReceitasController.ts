import FindByIdPageService from '@domain/services/institutional/pages/FindByIdPageService';
import ShowActiveCategoriesService from '@domain/services/recipe/categories/web/ShowActiveCategoriesService';
import ShowActiveLevelService from '@domain/services/recipe/levels/web/ShowActiveLevelService';
import ShowRecipeService from '@domain/services/recipe/recipes/ShowRecipeService';
import ShowImgRecipeService from '@domain/services/recipe/recipes/web/ShowImgRecipeService';
import ShowRecipeBySlugService from '@domain/services/recipe/recipes/web/ShowRecipeBySlugService';
import { RecipeFilter } from '@infra/typeorm/repositories/recipe/RecipiesRepository';
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class MaisReceitasController {

  public async getPageById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { company } = request.headers as { company: string };

    const findPage = container.resolve(FindByIdPageService);
    const result = await findPage.execute(id, company);

    return response.json(classToClass(result));
  }

  public async getLevels(request: Request, response: Response): Promise<Response> {
    const { company } = request.headers as { company: string };

    const levels = container.resolve(ShowActiveLevelService);
    const result = await levels.execute({company_id: company});

    return response.json(classToClass(result));
  }

  public async getCategories(request: Request, response: Response): Promise<Response> {
    const { company } = request.headers as { company: string };

    const categories = container.resolve(ShowActiveCategoriesService);
    const result = await categories.execute({company_id: company});

    return response.json(classToClass(result));
  }

  public async getRecipes(request: Request, response: Response): Promise<Response> {
    const { name, slug, categoryId, active, order, page, perPage } = request.query;
    const { company } = request.headers as { company: string };

    const showRecipes = container.resolve(ShowRecipeService);

    const recipes = await showRecipes.execute({company_id: company, paginate: { page, perPage }, filter: { slug, name, categoryId, active } as RecipeFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(recipes));
  }

  public async getRecipeBySlug(request: Request, response: Response): Promise<Response> {
    const { slug } = request.params as { slug: string };
    const { company } = request.headers as { company: string };

    const showRecipe = container.resolve(ShowRecipeBySlugService);

    const recipe = await showRecipe.execute({company_id: company, slug});

    return response.json(classToClass(recipe));
  }

  public async getImgRecipes(request: Request, response: Response): Promise<Response> {
    const { limit } = request.query;
    const { company } = request.headers as { company: string };

    const showRecipes = container.resolve(ShowImgRecipeService);
    const totalLimit = limit ? +limit : 10;

    const recipes = await showRecipes.execute({company_id: company, limit: totalLimit });

    return response.json(classToClass(recipes));
  }
}
