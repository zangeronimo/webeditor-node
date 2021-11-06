import { IPaginationResponse } from '@domain/interfaces/Base';
import IUsersRepository from '@domain/interfaces/webeditor/IUsersRepository';
import User from '@infra/typeorm/entities/webeditor/User';
import { OrderBy } from '@infra/typeorm/repositories/BaseTypes';
import { UserFilter } from '@infra/typeorm/repositories/webeditor/UsersRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  company_id: string;
  paginate?: any;
  filter?: UserFilter;
  order?: OrderBy;
}

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({ company_id, paginate, filter = {}, order = { field: 'name', order: 'ASC' } }: IRequest): Promise<IPaginationResponse<User>> {
    const users = await this.usersRepository.findAll(company_id, paginate, filter, order);
    return users;
  }
}

export default ShowUserService;
