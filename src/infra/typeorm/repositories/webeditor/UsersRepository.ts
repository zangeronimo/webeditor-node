import ICreateUserDTO from "@domain/dtos/webeditor/ICreateUserDTO";
import { IPaginationResponse } from "@domain/interfaces/Base";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import User from "@infra/typeorm/entities/webeditor/User";
import { FindOperator, getRepository, Like, Repository } from "typeorm";
import { OrderBy } from "../BaseTypes";

export type UserFilter = {
  id?: string;
  name?: string;
  email?: string;
}

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(ompanyId: string, paginate: any, filter: UserFilter, order: OrderBy): Promise<IPaginationResponse<User>> {

    const builder = this.ormRepository.createQueryBuilder('users');
    builder.innerJoinAndSelect('users.company', 'company');
    builder.leftJoinAndSelect('users.roles', 'roles');

    if (filter.name)
      builder.where("unaccent(lower(users.name)) LIKE unaccent(:s)", {s: `%${filter.name.toLowerCase()}%`})
    if (filter.email)
      builder.where("unaccent(lower(users.email)) LIKE unaccent(:s)", {s: `%${filter.email.toLowerCase()}%`})

    builder.orderBy(`users.${order.field}`, order.order);

    const { page = 1, perPage = 20 } = paginate;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);
    return { data: await builder.getMany(), total };
  }

  public async findById(id: string, companyId: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        id,
        companyId,
        deletedAt: null,
      },
      relations: ['roles'],
    });
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email,
        deletedAt: null,
      },
      relations: ['roles'],
    });
    return findUser;
  }

  public async create(model: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(model);
    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
