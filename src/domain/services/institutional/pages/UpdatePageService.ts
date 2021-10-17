import IPagesRepository from "@domain/interfaces/institutional/IPagesRepository";
import AppError from "@infra/errors/AppError";
import IStorageProvider from "@infra/providers/StorageProvider/models/IStorageProvider";
import Page from "@infra/typeorm/entities/institutional/Page";
import { inject, injectable } from "tsyringe";

interface IRequest {
  id: string;
  file: string;
  title: string;
  content: string;
  active: 0 | 1;
  companyId: string;
}

@injectable()
class UpdatePageService {
  constructor(
    @inject('PagesRepository')
    private pagesRepository: IPagesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute(model: IRequest): Promise<Page> {
    const page = await this.pagesRepository.findById(model.id, model.companyId);

    if (!page || page.companyId !== model.companyId) {
      throw new AppError('Page not found');
    }

    if (model.file) {
      await this.storageProvider.deleteFile(page.banner);
      const bannerUrl = await this.storageProvider.saveFile(model.file, `${model.companyId}/pages`);
      page.banner = bannerUrl;
    }

    page.title = model.title;
    page.content = model.content;
    page.active = model.active;

    return this.pagesRepository.save(page);
  }
}

export default UpdatePageService;
