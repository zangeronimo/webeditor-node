import ICreatePageDTO from "@domain/dtos/institutional/ICreatePageDTO";
import Page from "@infra/typeorm/entities/institutional/Page";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { PageFilter } from "@infra/typeorm/repositories/institutional/PagesRepository";
import { IPaginationResponse } from "../Base";

export default interface IPagesRepository {
  findAll(company_id: string, paginate: any, filter: PageFilter, order: OrderBy): Promise<IPaginationResponse<Page>>;
  findById(id: string, company_id: string): Promise<Page | undefined>;
  create(data: ICreatePageDTO): Promise<Page>;
  save(page: Page): Promise<Page>;
}
