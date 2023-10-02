import CreateCategoryService from "@domain/services/recipe/categories/CreateCategoryService";
import DeleteCategoryService from "@domain/services/recipe/categories/DeleteCategoryService";
import FindByIdCategoryService from "@domain/services/recipe/categories/FindByIdCategoryService";
import ShowCategoryService from "@domain/services/recipe/categories/ShowCategoryService";
import UpdateCategoryService from "@domain/services/recipe/categories/UpdateCategoryService";
import { CategoryFilter } from "@infra/typeorm/repositories/recipe/CategoriesRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";

export default class CategoriesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { name, levelId, active, order, page, perPage } = request.query;
    const { company } = request.user;

    // const showCategories = container.resolve(ShowCategoryService);

    // const categories = await showCategories.execute({company_id: company, paginate: { page, perPage }, filter: { name, levelId, active } as CategoryFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(null));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { company } = request.user;

    // const findCategory = container.resolve(FindByIdCategoryService);
    // const result = await findCategory.execute(id, company);

    return response.json(classToClass(null));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { name, active, levelId } = request.body;

    // const createCategory = container.resolve(CreateCategoryService);

    // const category = await createCategory.execute({ name, active: active ?? 1, levelId, companyId: company });

    return response.status(201).json(classToClass(null));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, name, active, levelId } = request.body;

    // const updateCategory = container.resolve(UpdateCategoryService);

    // const category = await updateCategory.execute({ id, name, active, levelId, companyId: company });

    return response.json(classToClass(null));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    // const deleteCategory = container.resolve(DeleteCategoryService);

    // const category = await deleteCategory.execute({ id, companyId: company });

    return response.json(classToClass(null));
  }
}
