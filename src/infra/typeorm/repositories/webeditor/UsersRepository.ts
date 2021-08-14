import ICreateUserDTO from "@domain/dtos/webeditor/ICreateUserDTO";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import User from "@infra/typeorm/entities/webeditor/User";
import { getRepository, Repository } from "typeorm";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(companyId: string): Promise<User[]> {
    const findUsers = await this.ormRepository.find({
      where: {
        companyId,
        deletedAt: null
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
