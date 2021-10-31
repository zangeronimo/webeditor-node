import IRolesRepository from '@domain/interfaces/webeditor/IRolesRepository';
import Role from '@infra/typeorm/entities/webeditor/Role';
import { OrderBy, RoleFilter } from '@infra/typeorm/repositories/webeditor/RolesRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  paginate?: any;
  filter?: RoleFilter;
  order?: OrderBy;
}

export interface IPaginationResponse {
  data: Role[];
  total: number;
}

@injectable()
class ShowRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute({paginate, filter = {}, order = { field: 'order', order: 'ASC' } }: IRequest): Promise<IPaginationResponse> {
    const roles = await this.rolesRepository.findAll(paginate, filter, order);
    return roles;
  }
}

export default ShowRoleService;
