import ICreatePageDTO from "@domain/dtos/institutional/ICreatePageDTO";
import Page from "@infra/typeorm/entities/institutional/Page";

export default interface IPagesRepository {
  findAll(company_id: string): Promise<Page[]>;
  findById(id: string, company_id: string): Promise<Page | undefined>;
  create(data: ICreatePageDTO): Promise<Page>;
  save(page: Page): Promise<Page>;
}
