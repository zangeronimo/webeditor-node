import FindByIdPageService from '@domain/services/institutional/pages/FindByIdPageService';
import ShowActiveLevelService from '@domain/services/recipe/levels/web/ShowActiveLevelService';
import ShowRecipeService from '@domain/services/recipe/recipes/ShowRecipeService';
import ShowImgRecipeService from '@domain/services/recipe/recipes/web/ShowImgRecipeService';
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

  public async getRecipes(request: Request, response: Response): Promise<Response> {
    const { name, slug, categoryId, active, order, page, perPage } = request.query;
    const { company } = request.headers as { company: string };

    const showRecipes = container.resolve(ShowRecipeService);

    const recipes = await showRecipes.execute({company_id: company, paginate: { page, perPage }, filter: { slug, name, categoryId, active } as RecipeFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(recipes));
  }

  public async getImgRecipes(request: Request, response: Response): Promise<Response> {
    const { limit } = request.query;
    const { company } = request.headers as { company: string };

    const showRecipes = container.resolve(ShowImgRecipeService);
    const totalLimit = limit ? +limit : 10;

    const recipes = await showRecipes.execute({company_id: company, limit: totalLimit });

    console.log(classToClass(recipes[1].ratings))

    return response.json(classToClass(recipes));
  }
}