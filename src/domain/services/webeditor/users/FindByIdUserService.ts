import { IFindUserByIdService } from '@domain/interfaces/services/webeditor/IFindUserByIdService';
import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import User from '@infra/typeorm/entities/webeditor/User';

class FindByIdUserService implements IFindUserByIdService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string, companyId: string): Promise<User | undefined> {
    return await this.usersRepository.findById(id, companyId);
  }
}

export default FindByIdUserService;
