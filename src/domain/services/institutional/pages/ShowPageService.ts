import IPagesRepository from '@domain/interfaces/institutional/IPagesRepository';
import Page from '@infra/typeorm/entities/institutional/Page';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  companyId: string;
}

@injectable()
class ShowPageService {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,
  ) { }

  public async execute({ companyId }: IRequest): Promise<Page[]> {
    const pages = await this.pagesRepository.findAll(companyId);
    return pages;
  }
}

export default ShowPageService;
