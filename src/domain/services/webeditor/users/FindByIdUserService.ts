import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import User from '@infra/typeorm/entities/webeditor/User';

class FindByIdUserService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string, company_id: string): Promise<User | undefined> {
    return await this.usersRepository.findById(id, company_id);
  }
}

export default FindByIdUserService;
