import ICompaniesRepository from "@domain/interfaces/webeditor/ICompaniesRepository";
import AppError from "@infra/errors/AppError";
import Company from "@infra/typeorm/entities/webeditor/Company";

interface IRequest {
  id: string;
}

class DeleteCompanyService {
  constructor(
    private companiesRepository: ICompaniesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Company> {
    const company = await this.companiesRepository.findById(model.id);

    if (!company) {
      throw new AppError('Company not found');
    }

    company.deletedAt = new Date();

    return this.companiesRepository.save(company);
  }
}

export default DeleteCompanyService;
