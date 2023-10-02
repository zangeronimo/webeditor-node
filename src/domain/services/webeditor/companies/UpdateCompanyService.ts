import ICompaniesRepository from "@domain/interfaces/webeditor/ICompaniesRepository";
import AppError from "@infra/errors/AppError";
import Company from "@infra/typeorm/entities/webeditor/Company";
import Module from "@infra/typeorm/entities/webeditor/Module";

interface IRequest {
  id: string;
  name: string;
  modules?: Module[];
}

class UpdateCompanyService {
  constructor(
    private companiesRepository: ICompaniesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(model.id);

    if (!company) {
      throw new AppError('Company not found');
    }

    const companyWithUpdatedName = await this.companiesRepository.findByName(model.name);

    if (companyWithUpdatedName && companyWithUpdatedName.id !== company.id) {
      throw new AppError('Name already in use.');
    }

    company.name = model.name;
    company.modules = model.modules ?? [];

    return this.companiesRepository.save(company);
  }
}

export default UpdateCompanyService;
