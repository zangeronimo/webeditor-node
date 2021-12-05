import CreateRateService from "@domain/services/recipe/ratings/CreateRateService";
import DeleteRateService from "@domain/services/recipe/ratings/DeleteRateService";
import FindByIdRateService from "@domain/services/recipe/ratings/FindByIdRateService";
import ShowRateService from "@domain/services/recipe/ratings/ShowRateService";
import UpdateRateService from "@domain/services/recipe/ratings/UpdateRateService";
import { RateFilter } from "@infra/typeorm/repositories/recipe/RatingsRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class RatingsController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { rate, recipeId, active, order, page } = request.query;
    const { company } = request.user;

    const showRatings = container.resolve(ShowRateService);

    const ratings = await showRatings.execute({company_id: company, paginate: { page }, filter: { rate, recipeId, active } as RateFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(ratings));
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { company } = request.user;

    const findRate = container.resolve(FindByIdRateService);
    const result = await findRate.execute(id, company);

    return response.json(classToClass(result));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { name, rate, comment, recipeId } = request.body;

    const createRate = container.resolve(CreateRateService);

    const rateCreated = await createRate.execute({ name, rate, comment, active: 2, recipeId, companyId: company });

    return response.status(201).json(classToClass(rateCreated));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, name, rate, comment,  active, recipeId } = request.body;

    const updateRate = container.resolve(UpdateRateService);

    const rateUpdated = await updateRate.execute({ id, name, rate, comment, active, recipeId, companyId: company });

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
