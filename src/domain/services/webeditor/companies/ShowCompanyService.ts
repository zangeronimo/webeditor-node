import { IPaginationResponse } from '@domain/interfaces/Base';
import ICompaniesRepository from '@domain/interfaces/webeditor/ICompaniesRepository';
import Company from '@infra/typeorm/entities/webeditor/Company';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { CompanyFilter } from '@infra/typeorm/repositories/webeditor/CompaniesRepository';

interface IRequest {
  paginate?: any;
  filter?: CompanyFilter;
  order?: OrderBy;
}

class ShowCompanyService {
  constructor(
    private companiesRepository: ICompaniesRepository,
  ) { }

  public async execute({paginate, filter = {}, order = { field: 'name', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<Company>> {
    const companies = await this.companiesRepository.findAll(paginate, filter, order);
    return companies;
  }
}

export default ShowCompanyService;
