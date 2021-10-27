import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import AppError from "@infra/errors/AppError";
import Role from "@infra/typeorm/entities/webeditor/Role";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  label: string;
  module: { id: string };
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
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
      module,
    });

    return role;
  }
}

export default CreateRoleService;
