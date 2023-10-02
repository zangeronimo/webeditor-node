import { IPaginationResponse } from '@domain/interfaces/Base';
import IPagesRepository from '@domain/interfaces/institutional/IPagesRepository';
import Page from '@infra/typeorm/entities/institutional/Page';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { PageFilter } from '@infra/typeorm/repositories/institutional/PagesRepository';

interface IRequest {
  company_id: string;
  paginate?: any;
  filter?: PageFilter;
  order?: OrderBy;
}

class ShowPageService {
  constructor(
    private pagesRepository: IPagesRepository,
  ) { }

  public async execute({ company_id, paginate, filter = {}, order = { field: 'title', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<Page>> {
    const pages = await this.pagesRepository.findAll(company_id, paginate, filter, order);
    return pages;
  }
}

export default ShowPageService;
