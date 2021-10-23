import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import User from '@infra/typeorm/entities/webeditor/User';
import { UserFilter } from '@infra/typeorm/repositories/webeditor/UsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
  filter?: UserFilter;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ company_id, filter = {} }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAll(company_id, filter);
    return users;
  }
}

export default ShowUserService;
