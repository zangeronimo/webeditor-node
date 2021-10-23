import ICreateUserDTO from "@domain/dtos/webeditor/ICreateUserDTO";
import User from "@infra/typeorm/entities/webeditor/User";
import { UserFilter } from "@infra/typeorm/repositories/webeditor/UsersRepository";

export default interface IUsersRepository {
  findAll(company_id: string, filter: UserFilter): Promise<User[]>;
  findById(id: string, company_id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
