import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import AppError from "@infra/errors/AppError";
import IHashProvider from "@infra/providers/HashProvider/models/IHashProvider";
import Role from "@infra/typeorm/entities/webeditor/Role";
import User from "@infra/typeorm/entities/webeditor/User";

interface IRequest {
  id: string;
  name: string;
  label: string;
  module: string;
}

class UpdateRoleService {
  constructor(
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(model.id);

    if (!role) {
      throw new AppError('Role not found');
    }

    const roleWithUpdatedName = await this.rolesRepository.findByName(model.name);

    if (roleWithUpdatedName && roleWithUpdatedName.id !== role.id) {
      throw new AppError('Name already in use.');
    }

    role.name = model.name;
    role.label = model.label;

    return this.rolesRepository.save(role);
  }
}

export default UpdateRoleService;
