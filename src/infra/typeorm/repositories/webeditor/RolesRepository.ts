import ICreateRoleDTO from "@domain/dtos/webeditor/ICreateRoleDTO";
import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import { IPaginationResponse } from "@domain/services/webeditor/roles/ShowRoleService";
import Role from "@infra/typeorm/entities/webeditor/Role";
import { FindOperator, getRepository, Like, Repository } from "typeorm";

export type RoleFilter = {
  id?: string;
  search?: string;
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

  public async findAll(paginate: any, filter: RoleFilter, order: OrderBy): Promise<IPaginationResponse> {

    const builder = this.ormRepository.createQueryBuilder('roles');
    builder.leftJoinAndSelect('roles.module', 'module');

    if (filter.search)
      builder.where("roles.name LIKE :s OR roles.label LIKE :s", {s: `%${filter.search}%`})

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
