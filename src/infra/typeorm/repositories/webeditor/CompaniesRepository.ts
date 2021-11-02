import ICreateCompanyDTO from "@domain/dtos/webeditor/ICreateCompanyDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import ICompaniesRepository from "@domain/interfaces/webeditor/ICompaniesRepository";
import Company from "@infra/typeorm/entities/webeditor/Company";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type CompanyFilter = {
  id?: string;
  name?: string;
}

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async findAll(paginate: any, filter: CompanyFilter, order: OrderBy): Promise<IPaginationResponse<Company>> {

    const builder = this.ormRepository.createQueryBuilder('companies');

    if (filter.name)
      builder.where("unaccent(lower(companies.name)) LIKE unaccent(:s)", {s: `%${filter.name.toLowerCase()}%`})

    builder.orderBy(`companies.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
  }

  public async findById(id: string): Promise<Company | undefined> {
    const findCompany = await this.ormRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: ['modules'],
    });
    return findCompany;
  }

  public async findByName(name: string): Promise<Company | undefined> {
    const findCompany = await this.ormRepository.findOne({
      where: {
        name,
        deletedAt: null,
      }
    });
    return findCompany;
  }

  public async create(model: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create(model);
    await this.ormRepository.save(company);

    return company;
  }

  public async save(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }
}

export default CompaniesRepository;
