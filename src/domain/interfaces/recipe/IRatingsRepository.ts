import ICreateRateDTO from "@domain/dtos/recipe/ICreateRateDTO";
import Rate from "@infra/typeorm/entities/recipe/Rate";

export default interface IRatingsRepository {
  findAll(company_id: string): Promise<Rate[]>;
  findById(id: string, company_id: string): Promise<Rate | undefined>;
  findByRecipe(recipe_id: string, company_id: string): Promise<Rate[]>;
  create(data: ICreateRateDTO): Promise<Rate>;
  save(Rate: Rate): Promise<Rate>;
}
