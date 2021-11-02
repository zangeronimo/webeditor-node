import { IPaginationResponse } from '@domain/interfaces/Base';
import IRolesRepository from '@domain/interfaces/webeditor/IRolesRepository';
import Role from '@infra/typeorm/entities/webeditor/Role';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { RoleFilter } from '@infra/typeorm/repositories/webeditor/RolesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  paginate?: any;
  filter?: RoleFilter;
  order?: OrderBy;
}

@injectable()
class ShowRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute({paginate, filter = {}, order = { field: 'order', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<Role>> {
    const roles = await this.rolesRepository.findAll(paginate, filter, order);
    return roles;
  }
}

export default ShowRoleService;
