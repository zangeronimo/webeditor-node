import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import UsersRepository from "@infra/typeorm/repositories/webeditor/UsersRepository";
import { container } from "tsyringe";


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);