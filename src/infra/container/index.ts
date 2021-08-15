import ICompaniesRepository from "@domain/interfaces/webeditor/ICompaniesRepository";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import BCryptHashProvider from "@infra/providers/HashProvider/implementation/BCryptHashProvider";
import IHashProvider from "@infra/providers/HashProvider/models/IHashProvider";
import CompaniesRepository from "@infra/typeorm/repositories/webeditor/CompaniesRepository";
import UsersRepository from "@infra/typeorm/repositories/webeditor/UsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider,
)
