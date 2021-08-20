import ICreateCompanyDTO from "@domain/dtos/webeditor/ICreateCompanyDTO";
import ICreateRoleDTO from "@domain/dtos/webeditor/ICreateRoleDTO";
import ICompaniesRepository from "@domain/interfaces/webeditor/ICompaniesRepository";
import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import Company from "@infra/typeorm/entities/webeditor/Company";
import Role from "@infra/typeorm/entities/webeditor/Role";
import { getRepository, Repository } from "typeorm";

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findAll(): Promise<Role[]> {
    const findRoles = await this.ormRepository.find({
      where: {
        deletedAt: null
      },
      relations: ['module'],
    });
    return findRoles;
  }

  public async findById(id: string): Promise<Role | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
      relations: ['module'],
    });
    return findRole;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const findRole = await this.ormRepository.findOne({
      where: {
        name,
        deletedAt: null,
      }
    });
    return findRole;
  }

  public async create(model: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create(model);
    await this.ormRepository.save(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }
}

export default RolesRepository;
