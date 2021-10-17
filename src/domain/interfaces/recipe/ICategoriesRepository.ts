import ICreateCategoryDTO from "@domain/dtos/recipe/ICreateCategoryDTO";
import Category from "@infra/typeorm/entities/recipe/Category";

export default interface ICategoriesRepository {
  findAll(company_id: string): Promise<Category[]>;
  findById(id: string, company_id: string): Promise<Category | undefined>;
  findByLevel(level_id: string, company_id: string): Promise<Category[]>;
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
}
