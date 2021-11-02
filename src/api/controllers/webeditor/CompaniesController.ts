import CreateCompanyService from "@domain/services/webeditor/companies/CreateCompanyService";
import DeleteCompanyService from "@domain/services/webeditor/companies/DeleteCompanyService";
import FindByIdCompanyService from "@domain/services/webeditor/companies/FindByIdCompanyService";
import ShowCompanyService from "@domain/services/webeditor/companies/ShowCompanyService";
import UpdateCompanyService from "@domain/services/webeditor/companies/UpdateCompanyService";
import AppError from "@infra/errors/AppError";
import { CompanyFilter } from "@infra/typeorm/repositories/webeditor/CompaniesRepository";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class CompaniesController {
  public async getAll(request: Request, response: Response): Promise<Response> {
    const { name, order, page } = request.query;

    const showCompanies = container.resolve(ShowCompanyService);

    const companies = await showCompanies.execute({paginate: { page }, filter: { name } as CompanyFilter, order: order && JSON.parse(order?.toString())});

    return response.json(classToClass(companies));
  }
  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findCompany = container.resolve(FindByIdCompanyService);
    const result = await findCompany.execute(id);

    return response.json(classToClass(result));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, modules } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({ name, modules });

    return response.status(201).json(classToClass(company));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, modules } = request.body;

    const updateCompany = container.resolve(UpdateCompanyService);

    const company = await updateCompany.execute({ id, name, modules });

    return response.json(classToClass(company));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { company } = request.user;
    const { id } = request.params;

    if (id === company) {
      throw new AppError("You don't have permission to delete your own company");
    }

    const deleteCompany = container.resolve(DeleteCompanyService);

    const result = await deleteCompany.execute({ id });

    return response.json(classToClass(result));
  }
}
