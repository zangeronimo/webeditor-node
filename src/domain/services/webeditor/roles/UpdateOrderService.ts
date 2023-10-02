import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import AppError from "@infra/errors/AppError";
import IHashProvider from "@infra/providers/HashProvider/models/IHashProvider";
import Role from "@infra/typeorm/entities/webeditor/Role";
import User from "@infra/typeorm/entities/webeditor/User";

interface IRequest {
  id: string;
  order: number;
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

    role.order = model.order;

    return await this.rolesRepository.save(role);
  }
}

export default UpdateRoleService;
