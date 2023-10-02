import ICompaniesRepository from "@domain/interfaces/webeditor/ICompaniesRepository";
import AppError from "@infra/errors/AppError";
import Company from "@infra/typeorm/entities/webeditor/Company";
import Module from "@infra/typeorm/entities/webeditor/Module";

interface IRequest {
  name: string;
  modules: Module[]
}

class CreateCompanyService {
  constructor(
    private companyRepository: ICompaniesRepository,
  ) { }

  public async execute({ name, modules }: IRequest): Promise<Company> {
    const checkCompanyExists = await this.companyRepository.findByName(name);

    if (checkCompanyExists) {
      throw new AppError('Name already used.');
    }

    const company = await this.companyRepository.create({ name, modules });

    return company;
  }
}

export default CreateCompanyService;
