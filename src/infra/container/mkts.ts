import ICategoriesRepository from "@domain/interfaces/mkt/ICategoriesRepository";
import IProductsRepository from "@domain/interfaces/mkt/IProductsRepository";
import CategoriesRepository from "@infra/typeorm/repositories/mkt/CategoriesRepository";
import ProductsRepository from "@infra/typeorm/repositories/mkt/ProductsRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoriesRepository>(
  'MktCategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
