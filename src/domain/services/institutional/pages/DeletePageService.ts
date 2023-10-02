import IPagesRepository from "@domain/interfaces/institutional/IPagesRepository";
import AppError from "@infra/errors/AppError";
import Page from "@infra/typeorm/entities/institutional/Page";

interface IRequest {
  id: string;
  companyId: string;
}

class DeletePageService {
  constructor(
    private pagesRepository: IPagesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Page> {
    const page = await this.pagesRepository.findById(model.id, model.companyId);

    if (!page || page.companyId !== model.companyId) {
      throw new AppError('Page not found');
    }

    page.deletedAt = new Date();

    return this.pagesRepository.save(page);
  }
}

export default DeletePageService;
