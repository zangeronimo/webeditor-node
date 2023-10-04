import ICreateUserDTO from "@domain/dtos/webeditor/ICreateUserDTO";
import User from "@infra/typeorm/entities/webeditor/User";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { UserFilter } from "@infra/typeorm/repositories/webeditor/UsersRepository";
import { IPaginationResponse } from "../Base";

export default interface IUsersRepository {
  findAll(company_id: string, paginate: any, filter?: UserFilter, order?: OrderBy): Promise<IPaginationResponse<User>>;
  findById(id: string, company_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
