import { IUserHasRoleService } from '@domain/interfaces/services/webeditor/IUserHasRoleService';
import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import { UserHasRoleModel } from '@domain/models/webeditor/UserHasRoleModel';

class UserHasRoleService implements IUserHasRoleService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ id, companyId, role }: UserHasRoleModel): Promise<boolean> {
    const user = await this.usersRepository.findById(id, companyId);

    if (!user) return false;

    const roles = user?.roles.map(role => role.name);
    return roles.includes(role);
  }
}

export default UserHasRoleService;
