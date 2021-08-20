import IRolesRepository from '@domain/interfaces/webeditor/IRolesRepository';
import Role from '@infra/typeorm/entities/webeditor/Role';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute(): Promise<Role[]> {
    const roles = await this.rolesRepository.findAll();
    return roles;
  }
}

export default ShowRoleService;
