import ICreateCompanyDTO from "@domain/dtos/webeditor/ICreateCompanyDTO";
import ICompaniesRepository from "@domain/interfaces/webeditor/ICompaniesRepository";
import Company from "@infra/typeorm/entities/webeditor/Company";
import { getRepository, Repository } from "typeorm";

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async findAll(): Promise<Company[]> {
    const findCompanies = await this.ormRepository.find({
      where: {
        deletedAt: null
      },
      relations: ['modules'],
    });
    return findCompanies;
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
