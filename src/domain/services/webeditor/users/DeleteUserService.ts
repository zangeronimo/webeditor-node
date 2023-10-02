import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import AppError from "@infra/errors/AppError";
import User from "@infra/typeorm/entities/webeditor/User";

interface IRequest {
  id: string;
  company: string;
}

class DeleteUserService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(model: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(model.id, model.company);

    if (!user || user.companyId !== model.company) {
      throw new AppError('User not found');
    }

    user.deletedAt = new Date();

    return this.usersRepository.save(user);
  }
}

export default DeleteUserService;
