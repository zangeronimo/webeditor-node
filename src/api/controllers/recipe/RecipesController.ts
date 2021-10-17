import CreateRecipeService from "@domain/services/recipe/recipes/CreateRecipeService";
import DeleteRecipeService from "@domain/services/recipe/recipes/DeleteRecipeService";
import ShowRecipeService from "@domain/services/recipe/recipes/ShowRecipeService";
import UpdateRecipeService from "@domain/services/recipe/recipes/UpdateRecipeService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class RecipesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;

    const showRecipes = container.resolve(ShowRecipeService);

    const recipes = await showRecipes.execute({ companyId: company });

    return response.json(classToClass(recipes));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { slug, name, ingredients, preparation, active, categoryId } = request.body;

    const createRecipe = container.resolve(CreateRecipeService);

    const recipe = await createRecipe.execute({ slug, name, ingredients, preparation, active: active ?? 0, categoryId, companyId: company });

    return response.status(201).json(classToClass(recipe));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, slug, name, ingredients, preparation,  active, categoryId } = request.body;

    const updateRecipe = container.resolve(UpdateRecipeService);

    const recipe = await updateRecipe.execute({ id, slug, name, ingredients, preparation, active, categoryId, companyId: company });

    return response.json(classToClass(recipe));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    const deleteRecipe = container.resolve(DeleteRecipeService);

    const recipe = await deleteRecipe.execute({ id, companyId: company });

    return response.json(classToClass(recipe));
  }
}
