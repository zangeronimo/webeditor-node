import ICreateRoleDTO from "@domain/dtos/webeditor/ICreateRoleDTO";
import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import Role from "@infra/typeorm/entities/webeditor/Role";
import { FindOperator, getRepository, Like, Repository } from "typeorm";

export type RoleFilter = {
  id?: string;
  name?: FindOperator<string>;
  label?: FindOperator<string>;
  moduleId?: string;
}

export type OrderBy = {
  field: string;
  order: 'ASC' | 'DESC';
}

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findAll(filter: RoleFilter, order: OrderBy): Promise<Role[]> {

    const where: RoleFilter = {};

    if (filter.id) where.id = filter.id;
    if (filter.name) where.name = Like(`%${filter.name}%`);
    if (filter.label) where.label = Like(`%${filter.label}%`);
    if (filter.moduleId) where.moduleId = filter.moduleId;

    const findRoles = await this.ormRepository.find({
      where: {
        deletedAt: null,
        ...where
      },
      order: {
        [order.field]: order.order
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
