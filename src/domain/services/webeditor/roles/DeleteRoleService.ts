import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import AppError from "@infra/errors/AppError";
import Role from "@infra/typeorm/entities/webeditor/Role";

interface IRequest {
  id: string;
}

class DeleteRoleService {
  constructor(
    private rolesRepository: IRolesRepository,
  ) { }

  public async execute(model: IRequest): Promise<Role> {
    const role = await this.rolesRepository.findById(model.id);

    if (!role) {
      throw new AppError('Role not found');
    }

    role.deletedAt = new Date();

    return this.rolesRepository.save(role);
  }
}

export default DeleteRoleService;
