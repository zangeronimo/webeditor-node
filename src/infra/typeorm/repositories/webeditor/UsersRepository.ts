import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import User from "@infra/typeorm/entities/webeditor/User";
import { getRepository, Repository } from "typeorm";

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(company_id: string): Promise<User[]> {
    const findUsers = await this.ormRepository.find({
      where: {
        webeditor_companies_id: company_id,
        deleted_at: null
      },
      relations: ['company']
    });
    return findUsers;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return findUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return findUser;
  }
}

export default UsersRepository;
