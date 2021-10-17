import CreateRateService from "@domain/services/recipe/ratings/CreateRateService";
import DeleteRateService from "@domain/services/recipe/ratings/DeleteRateService";
import ShowRateService from "@domain/services/recipe/ratings/ShowRateService";
import UpdateRateService from "@domain/services/recipe/ratings/UpdateRateService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class RatingsController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;

    const showRatings = container.resolve(ShowRateService);

    const ratings = await showRatings.execute({ companyId: company });

    return response.json(classToClass(ratings));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { rate, comment, active, recipeId } = request.body;

    const createRate = container.resolve(CreateRateService);

    const rateCreated = await createRate.execute({ rate, comment, active: active ?? 0, recipeId, companyId: company });

    return response.status(201).json(classToClass(rateCreated));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, rate, comment,  active, recipeId } = request.body;

    const updateRate = container.resolve(UpdateRateService);

    const rateUpdated = await updateRate.execute({ id, rate, comment, active, recipeId, companyId: company });

    return response.json(classToClass(rateUpdated));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    const deleteRate = container.resolve(DeleteRateService);

    const rate = await deleteRate.execute({ id, companyId: company });

    return response.json(classToClass(rate));
  }
}
