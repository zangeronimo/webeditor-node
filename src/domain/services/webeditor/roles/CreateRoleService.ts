import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import AppError from "@infra/errors/AppError";
import Role from "@infra/typeorm/entities/webeditor/Role";

interface IRequest {
  name: string;
  label: string;
  module: { id: string };
}

class CreateRoleService {
  constructor(
    private roleRepository: IRolesRepository,
  ) { }

  public async execute({ name, label, module }: IRequest): Promise<Role> {
    const checkRoleExists = await this.roleRepository.findByName(name);

    if (checkRoleExists) {
      throw new AppError('Name already used.');
    }

    const role = await this.roleRepository.create({
      name,
      label,
      order: 0,
      module,
    });

    return role;
  }
}

export default CreateRoleService;
