import { IDeleteUserService } from "@domain/interfaces/services/webeditor/IDeleteUserService";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import AppError from "@infra/errors/AppError";
import User from "@infra/typeorm/entities/webeditor/User";

class DeleteUserService implements IDeleteUserService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(id: string, companyId: string): Promise<User> {
    const user = await this.usersRepository.findById(id, companyId);

    if (!user || user.companyId !== companyId) {
      throw new AppError('User not found');
    }

    user.deletedAt = new Date();

    return this.usersRepository.save(user);
  }
}

export default DeleteUserService;
