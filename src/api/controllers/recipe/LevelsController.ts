import CreateLevelService from "@domain/services/recipe/levels/CreateLevelService";
import DeleteLevelService from "@domain/services/recipe/levels/DeleteLevelService";
import ShowLevelService from "@domain/services/recipe/levels/ShowLevelService";
import UpdateLevelService from "@domain/services/recipe/levels/UpdateLevelService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class LevelsController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;

    const showLevels = container.resolve(ShowLevelService);

    const levels = await showLevels.execute({ companyId: company });

    return response.json(classToClass(levels));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { name, active } = request.body;

    const createLevel = container.resolve(CreateLevelService);

    const level = await createLevel.execute({ name, active: active ?? 1, companyId: company });

    return response.status(201).json(classToClass(level));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, name, active } = request.body;

    const updateLevel = container.resolve(UpdateLevelService);

    const level = await updateLevel.execute({ id, name, active, companyId: company });

    return response.json(classToClass(level));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    const deleteLevel = container.resolve(DeleteLevelService);

    const level = await deleteLevel.execute({ id, companyId: company });

    return response.json(classToClass(level));
  }
}
