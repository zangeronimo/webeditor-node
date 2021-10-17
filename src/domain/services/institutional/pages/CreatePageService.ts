import IPagesRepository from "@domain/interfaces/institutional/IPagesRepository";
import Page from "@infra/typeorm/entities/institutional/Page";
import { inject, injectable } from "tsyringe";
import * as fs from "fs";
import IStorageProvider from "@infra/providers/StorageProvider/models/IStorageProvider";

interface IRequest {
  file: string;
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

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) { }

  public async execute({ file, title, content, active, companyId }: IRequest): Promise<Page> {
    const bannerUrl = await this.storageProvider.saveFile(file, `${companyId}/pages`);
    const page = await this.pageRepository.create({banner: bannerUrl, title, content, active, companyId});
    return page;
  }
}

export default CreatePageService;
