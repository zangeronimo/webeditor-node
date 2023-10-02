import IRolesRepository from '@domain/interfaces/webeditor/IRolesRepository';
import Role from '@infra/typeorm/entities/webeditor/Role';

class FindByIdRoleService {
  constructor(
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute(id: string): Promise<Role | undefined> {
    return await this.rolesRepository.findById(id);
  }
}

export default FindByIdRoleService;
