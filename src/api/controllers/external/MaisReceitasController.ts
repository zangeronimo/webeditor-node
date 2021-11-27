import FindByIdPageService from '@domain/services/institutional/pages/FindByIdPageService';
import ShowActiveLevelService from '@domain/services/recipe/levels/ShowActiveLevelService';
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
}
