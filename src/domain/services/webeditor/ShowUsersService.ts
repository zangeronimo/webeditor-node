import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import User from '@infra/typeorm/entities/webeditor/User';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ company_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAll(company_id);
    return users;
  }
}

export default ShowProfileService;
