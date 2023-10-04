import { IUpdateUserService } from "@domain/interfaces/services/webeditor/IUpdateUserService";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import { UpdateUserModel } from "@domain/models/webeditor/UpdateUserModel";
import AppError from "@infra/errors/AppError";
import IHashProvider from "@infra/providers/HashProvider/models/IHashProvider";
import Role from "@infra/typeorm/entities/webeditor/Role";
import User from "@infra/typeorm/entities/webeditor/User";
class UpdateUserService implements IUpdateUserService{
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) { }

  public async execute(model: UpdateUserModel): Promise<User> {
    const user = await this.usersRepository.findById(model.id, model.companyId);

    if (!user || user.companyId !== model.companyId) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(model.email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('E-mail already in use.');
    }

    user.name = model.name;
    user.email = model.email;
    user.roles = model.roles ?? [];

    if (model.password) {
      user.password = await this.hashProvider.generateHash(model.password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateUserService;
