import User from "@infra/typeorm/entities/webeditor/User";

export default interface IUsersRepository {
  findAll(company_id: string): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
