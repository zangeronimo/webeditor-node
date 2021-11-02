import ICreateCompanyDTO from "@domain/dtos/webeditor/ICreateCompanyDTO";
import Company from "@infra/typeorm/entities/webeditor/Company";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { CompanyFilter } from "@infra/typeorm/repositories/webeditor/CompaniesRepository";
import { IPaginationResponse } from "../Base";

export default interface ICompaniesRepository {
  findAll(paginate: any, filter: CompanyFilter, order: OrderBy): Promise<IPaginationResponse<Company>>;
  findById(id: string): Promise<Company | undefined>;
  findByName(name: string): Promise<Company | undefined>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  save(company: Company): Promise<Company>;
}
