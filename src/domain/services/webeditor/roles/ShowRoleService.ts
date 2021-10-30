import IRolesRepository from '@domain/interfaces/webeditor/IRolesRepository';
import Role from '@infra/typeorm/entities/webeditor/Role';
import { OrderBy, RoleFilter } from '@infra/typeorm/repositories/webeditor/RolesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  filter?: RoleFilter;
  order?: OrderBy;
}

@injectable()
class ShowRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute({filter = {}, order = { field: 'order', order: 'ASC' } }: IRequest): Promise<Role[]> {
    const roles = await this.rolesRepository.findAll(filter, order);
    return roles;
  }
}

export default ShowRoleService;
