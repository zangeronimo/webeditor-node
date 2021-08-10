import ICreateUserDTO from "@domain/dtos/webeditor/ICreateUserDTO";
import User from "@infra/typeorm/entities/webeditor/User";

export default interface IUsersRepository {
  findAll(company_id: string): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
