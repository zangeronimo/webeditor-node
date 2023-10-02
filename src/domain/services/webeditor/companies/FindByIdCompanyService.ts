import ICompaniesRepository from '@domain/interfaces/webeditor/ICompaniesRepository';
import Company from '@infra/typeorm/entities/webeditor/Company';

class FindByIdCompanyService {
  constructor(
    private companiesRepository: ICompaniesRepository,
  ) { }

  public async execute(id: string): Promise<Company | undefined> {
    return await this.companiesRepository.findById(id);
  }
}

export default FindByIdCompanyService;
