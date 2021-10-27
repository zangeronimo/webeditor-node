import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  id: string;
  company_id: string;
  roles: string[];
}

@injectable()
class UserHasSomeRoleService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id, company_id, roles }: IRequest): Promise<Boolean> {
    const user = await this.usersRepository.findById(id, company_id);

    if (!user) return false;

    const hasRole = user?.roles.filter(role => roles.includes(role.name));
    return !!hasRole;
  }
}

export default UserHasSomeRoleService;
