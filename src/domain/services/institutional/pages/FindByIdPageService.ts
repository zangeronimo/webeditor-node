import IPagesRepository from '@domain/interfaces/institutional/IPagesRepository';
import Page from '@infra/typeorm/entities/institutional/Page';

class FindByIdPageService {
  constructor(
    private pagesRepository: IPagesRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<Page | undefined> {
    return await this.pagesRepository.findById(id, company_id);
  }
}

export default FindByIdPageService;
