import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import { CreateUserModel } from "@domain/models/webeditor/CreateUserModel";
import AppError from "@infra/errors/AppError";
import IHashProvider from "@infra/providers/HashProvider/models/IHashProvider";
import User from "@infra/typeorm/entities/webeditor/User";

class CreateUserService {
  constructor(
    private userRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) { }

  public async execute(model: CreateUserModel): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(model.email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashPassword = await this.hashProvider.generateHash(model.password);

    const user = await this.userRepository.create({
      name: model.name,
      email: model.email,
      password: hashPassword,
      companyId: model.companyId,
      roles: model.roles
    });

    return user;
  }
}

export default CreateUserService;
