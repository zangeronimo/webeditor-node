import IRateDTO from "@domain/dtos/recipe/IRateDTO";
import Rate from "@infra/typeorm/entities/recipe/Rate";

export default interface IRatingsRepository {
  findAll(company_id: string): Promise<Rate[]>;
  findById(id: string, company_id: string): Promise<Rate | undefined>;
  findByRecipe(recipe_id: string, company_id: string): Promise<Rate[]>;
  create(data: IRateDTO): Promise<Rate>;
  save(Rate: Rate): Promise<Rate>;
}
