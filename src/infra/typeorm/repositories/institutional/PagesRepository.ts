import ICreatePageDTO from "@domain/dtos/institutional/ICreatePageDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import IPagesRepository from "@domain/interfaces/institutional/IPagesRepository";
import Page from "@infra/typeorm/entities/institutional/Page";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type PageFilter = {
  id?: string;
  title?: string;
}

class PagesRepository implements IPagesRepository {
  private ormRepository: Repository<Page>;

  constructor() {
    this.ormRepository = getRepository(Page);
  }

  public async findAll(companyId: string, paginate: any, filter: PageFilter, order: OrderBy): Promise<IPaginationResponse<Page>> {

    const builder = this.ormRepository.createQueryBuilder('pages');
    builder.innerJoinAndSelect('pages.company', 'company');

    builder.where('pages.companyId = :s', { s: companyId});

    if (filter.title)
      builder.where("unaccent(lower(pages.title)) LIKE unaccent(:s)", {s: `%${filter.title.toLowerCase()}%`})

    builder.orderBy(`pages.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
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
