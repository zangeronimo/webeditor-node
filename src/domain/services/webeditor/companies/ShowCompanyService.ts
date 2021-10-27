import ICompaniesRepository from '@domain/interfaces/webeditor/ICompaniesRepository';
import Company from '@infra/typeorm/entities/webeditor/Company';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) { }

  public async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.findAll();
    return companies;
  }
}

export default ShowCompanyService;
