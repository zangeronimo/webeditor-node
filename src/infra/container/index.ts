import IPagesRepository from "@domain/interfaces/institutional/IPagesRepository";
import ICompaniesRepository from "@domain/interfaces/webeditor/ICompaniesRepository";
import IModulesRepository from "@domain/interfaces/webeditor/IModulesRepository";
import IRolesRepository from "@domain/interfaces/webeditor/IRolesRepository";
import IUsersRepository from "@domain/interfaces/webeditor/IUsersRepository";
import BCryptHashProvider from "@infra/providers/HashProvider/implementation/BCryptHashProvider";
import IHashProvider from "@infra/providers/HashProvider/models/IHashProvider";
import PagesRepository from "@infra/typeorm/repositories/institutional/PagesRepository";
import CompaniesRepository from "@infra/typeorm/repositories/webeditor/CompaniesRepository";
import ModulesRepository from "@infra/typeorm/repositories/webeditor/ModulesRepository";
import RolesRepository from "@infra/typeorm/repositories/webeditor/RolesRepository";
import UsersRepository from "@infra/typeorm/repositories/webeditor/UsersRepository";
import { container } from "tsyringe";

container.registerSingleton<IPagesRepository>(
  'PagesRepository',
  PagesRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<ICompaniesRepository>(
  'CompaniesRepository',
  CompaniesRepository,
);
container.registerSingleton<IModulesRepository>(
  'ModulesRepository',
  ModulesRepository,
);
container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BCryptHashProvider,
)
