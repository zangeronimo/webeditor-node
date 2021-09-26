import IPagesRepository from "@domain/interfaces/institutional/IPagesRepository";
import Page from "@infra/typeorm/entities/institutional/Page";
import { inject, injectable } from "tsyringe";

interface IRequest {
  banner: string;
  title: string;
  content: string;
  active: 0 | 1;
  companyId: string;
}

@injectable()
class CreatePageService {
  constructor(
    @inject('PagesRepository')
    private pageRepository: IPagesRepository,
  ) { }

  public async execute({ banner, title, content, active, companyId }: IRequest): Promise<Page> {
    const page = await this.pageRepository.create({
      banner, title, content, active, companyId,
    });

    return page;
  }
}

export default CreatePageService;
