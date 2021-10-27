import ICreateUserDTO from "@domain/dtos/webeditor/ICreateUserDTO";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import User from "@infra/typeorm/entities/webeditor/User";
import { FindOperator, getRepository, Like, Repository } from "typeorm";

export type UserFilter = {
  id?: string;
  name?: FindOperator<string>;
  email?: FindOperator<string>;
  active?: 0 | 1;
}

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(companyId: string, filter = {} as UserFilter): Promise<User[]> {

    const where: UserFilter = {};

    if (filter.id) where.id = filter.id;
    if (filter.name) where.name = Like(`%${filter.name}%`);
    if (filter.email) where.email = Like(`%${filter.email}%`);
    if (filter.active) where.active = filter.active;

    const findUsers = await this.ormRepository.find({
      where: {
        companyId,
        deletedAt: null,
        ...where
      },
      relations: ['company', 'roles'],
    });
    return findUsers;
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
