
import ICategoriesRepository from "@domain/interfaces/recipe/ICategoriesRepository";
import IImagesRepository from "@domain/interfaces/recipe/IImagesRepository";
import ILevelsRepository from "@domain/interfaces/recipe/ILevelsRepository";
import IRatingsRepository from "@domain/interfaces/recipe/IRatingsRepository";
import IRecipesRepository from "@domain/interfaces/recipe/IRecipesRepository";
import CategoriesRepository from "@infra/typeorm/repositories/recipe/CategoriesRepository";
import ImagesRepository from "@infra/typeorm/repositories/recipe/ImagesRepository";
import LevelsRepository from "@infra/typeorm/repositories/recipe/LevelsRepository";
import RatingsRepository from "@infra/typeorm/repositories/recipe/RatingsRepository";
import RecipesRepository from "@infra/typeorm/repositories/recipe/RecipiesRepository";
import { container } from "tsyringe";

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IImagesRepository>(
  'ImagesRepository',
  ImagesRepository,
);

container.registerSingleton<ILevelsRepository>(
  'LevelsRepository',
  LevelsRepository,
);

container.registerSingleton<IRatingsRepository>(
  'RatingsRepository',
  RatingsRepository,
);

container.registerSingleton<IRecipesRepository>(
  'RecipesRepository',
  RecipesRepository,
);
