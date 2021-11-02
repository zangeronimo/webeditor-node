import ICreateRoleDTO from "@domain/dtos/webeditor/ICreateRoleDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import Role from "@infra/typeorm/entities/webeditor/Role";
import { getRepository, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type RoleFilter = {
  id?: string;
  search?: string;
  moduleId?: string;
}

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findAll(paginate: any, filter: RoleFilter, order: OrderBy): Promise<IPaginationResponse<Role>> {

    const builder = this.ormRepository.createQueryBuilder('roles');
    builder.leftJoinAndSelect('roles.module', 'module');

    if (filter.search)
      builder.where("unaccent(lower(roles.name)) LIKE unaccent(:s) OR unaccent(lower(roles.label)) LIKE unaccent(:s)", {s: `%${filter.search.toLowerCase()}%`})
    if (order.field === 'module.name')
      builder.orderBy(order.field, order.order);
    else
      builder.orderBy(`roles.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);

    return { data: await builder.getMany(), total };
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
