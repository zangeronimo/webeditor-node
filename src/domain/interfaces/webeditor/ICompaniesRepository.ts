import ICreateCompanyDTO from "@domain/dtos/webeditor/ICreateCompanyDTO";
import Company from "@infra/typeorm/entities/webeditor/Company";

export default interface ICompaniesRepository {
  findAll(): Promise<Company[]>;
  findById(id: string): Promise<Company | undefined>;
  findByName(name: string): Promise<Company | undefined>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  save(company: Company): Promise<Company>;
}
