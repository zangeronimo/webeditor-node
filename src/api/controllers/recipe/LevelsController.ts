import CreateLevelService from "@domain/services/recipe/levels/CreateLevelService";
import DeleteLevelService from "@domain/services/recipe/levels/DeleteLevelService";
import FindByIdLevelService from "@domain/services/recipe/levels/FindByIdLevelService";
import ShowLevelService from "@domain/services/recipe/levels/ShowLevelService";
import UpdateLevelService from "@domain/services/recipe/levels/UpdateLevelService";
import { LevelFilter } from "@infra/typeorm/repositories/recipe/LevelsRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";

export default class LevelsController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { name, active, order, page } = request.query;
    const { company } = request.user;

    // const showLevels = container.resolve(ShowLevelService);

    // const levels = await showLevels.execute({company_id: company, paginate: { page }, filter: { name, active } as LevelFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(null));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { company } = request.user;

    // const findLevel = container.resolve(FindByIdLevelService);
    // const result = await findLevel.execute(id, company);

    return response.json(classToClass(null));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { name, active } = request.body;

    // const createLevel = container.resolve(CreateLevelService);

    // const level = await createLevel.execute({ name, active: active ?? 1, companyId: company });

    return response.status(201).json(classToClass(null));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, name, active } = request.body;

    // const updateLevel = container.resolve(UpdateLevelService);

    // const level = await updateLevel.execute({ id, name, active, companyId: company });

    return response.json(classToClass(null));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    // const deleteLevel = container.resolve(DeleteLevelService);

    // const level = await deleteLevel.execute({ id, companyId: company });

    return response.json(classToClass(null));
  }
}
