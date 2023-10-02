import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';

interface IRequest {
  id: string;
  company_id: string;
  role: string;
}

class UserHasRoleService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id, company_id, role }: IRequest): Promise<Boolean> {
    const user = await this.usersRepository.findById(id, company_id);

    if (!user) return false;

    const roles = user?.roles.map(role => role.name);
    return roles.includes(role);
  }
}

export default UserHasRoleService;
