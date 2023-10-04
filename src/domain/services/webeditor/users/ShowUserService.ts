import { IPaginationResponse } from '@domain/interfaces/Base';
import { IShowUsersService } from '@domain/interfaces/services/webeditor/IShowUsersService';
import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import { ShowUsersModel } from '@domain/models/webeditor/ShowUsersModel';
import User from '@infra/typeorm/entities/webeditor/User';


class ShowUserService implements IShowUsersService {
  constructor(
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(model: ShowUsersModel): Promise<IPaginationResponse<User>> {
    const users = await this.usersRepository.findAll(model.companyId, model.paginate, model.filter, model.order);
    return users;
  }
}

export default ShowUserService;
