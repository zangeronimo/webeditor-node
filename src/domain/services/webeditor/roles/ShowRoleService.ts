import IRolesRepository from '@domain/interfaces/webeditor/IRolesRepository';
import Role from '@infra/typeorm/entities/webeditor/Role';
import { RoleFilter } from '@infra/typeorm/repositories/webeditor/RolesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  filter?: RoleFilter;
}

@injectable()
class ShowRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute({filter = {} }: IRequest): Promise<Role[]> {
    const roles = await this.rolesRepository.findAll(filter);
    return roles;
  }
}

export default ShowRoleService;
