import CreatePageService from '@domain/services/institutional/pages/CreatePageService';
import DeletePageService from '@domain/services/institutional/pages/DeletePageService';
import ShowPagesService from '@domain/services/institutional/pages/ShowPageService';
import UpdatePageService from '@domain/services/institutional/pages/UpdatePageService';
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class PagesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;

    const showPages = container.resolve(ShowPagesService);

    const pages = await showPages.execute({ companyId: company });

    return response.json(classToClass(pages));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { file, title, content, active } = request.body;

    const createPage = container.resolve(CreatePageService);

    const page = await createPage.execute({ file, title, content, active: active ?? 1, companyId: company });

    return response.status(201).json(classToClass(page));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id, file, title, content, active } = request.body;

    const updatePage = container.resolve(UpdatePageService);

    const page = await updatePage.execute({ id, file, title, content, active, companyId: company });

    return response.json(classToClass(page));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    const deletePage = container.resolve(DeletePageService);

    const page = await deletePage.execute({ id, companyId: company });

    return response.json(classToClass(page));
  }
}
