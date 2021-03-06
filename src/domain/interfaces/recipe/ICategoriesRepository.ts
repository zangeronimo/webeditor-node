import ICreateCategoryDTO from "@domain/dtos/recipe/ICreateCategoryDTO";
import Category from "@infra/typeorm/entities/recipe/Category";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { CategoryFilter } from "@infra/typeorm/repositories/recipe/CategoriesRepository";
import { IPaginationResponse } from "../Base";

export default interface ICategoriesRepository {
  findAll(company_id: string, paginate: any, filter: CategoryFilter, order: OrderBy): Promise<IPaginationResponse<Category>>;
  findActive(company_id: string): Promise<Category[]>;
  findById(id: string, company_id: string): Promise<Category | undefined>;
  findBySlug(company_id: string, level: string, slug: string): Promise<Category | undefined>;
  findByLevel(level_id: string, company_id: string): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}
