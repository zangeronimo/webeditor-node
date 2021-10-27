import IModulesRepository from "@domain/interfaces/webeditor/IModulesRepository";
import AppError from "@infra/errors/AppError";
import Module from "@infra/typeorm/entities/webeditor/Module";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
}

@injectable()
class CreateModuleService {
  constructor(
    @inject('ModulesRepository')
    private moduleRepository: IModulesRepository,
  ) { }

  public async execute({ name }: IRequest): Promise<Module> {
    const checkModuleExists = await this.moduleRepository.findByName(name);

    if (checkModuleExists) {
      throw new AppError('Name already used.');
    }

    const module = await this.moduleRepository.create({ name });

    return module;
  }
}

export default CreateModuleService;
