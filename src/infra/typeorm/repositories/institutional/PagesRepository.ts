import ICreatePageDTO from "@domain/dtos/institutional/ICreatePageDTO";
import IPagesRepository from "@domain/interfaces/institutional/IPagesRepository";
import Page from "@infra/typeorm/entities/institutional/Page";
import { getRepository, Repository } from "typeorm";

class PagesRepository implements IPagesRepository {
  private ormRepository: Repository<Page>;

  constructor() {
    this.ormRepository = getRepository(Page);
  }

  public async findAll(companyId: string): Promise<Page[]> {
    const findPages = await this.ormRepository.find({
      where: {
        companyId,
        deletedAt: null
      },
    });
    return findPages;
  }

  public async findById(id: string, companyId: string): Promise<Page | undefined> {
    const findPage = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
    });
    return findPage;
  }

  public async create(model: ICreatePageDTO): Promise<Page> {
    const page = this.ormRepository.create(model);
    await this.ormRepository.save(page);

    return page;
  }

  public async save(page: Page): Promise<Page> {
    return this.ormRepository.save(page);
  }
}

export default PagesRepository;
