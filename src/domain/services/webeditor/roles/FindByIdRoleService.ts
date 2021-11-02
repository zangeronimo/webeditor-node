import IRolesRepository from '@domain/interfaces/webeditor/IRolesRepository';
import Role from '@infra/typeorm/entities/webeditor/Role';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindByIdRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute(id: string): Promise<Role | undefined> {
    return await this.rolesRepository.findById(id);
  }
}

export default FindByIdRoleService;
