import ICreateRateDTO from "@domain/dtos/recipe/ICreateRateDTO";
import Rate from "@infra/typeorm/entities/recipe/Rate";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { RateFilter } from "@infra/typeorm/repositories/recipe/RatingsRepository";
import { IPaginationResponse } from "../Base";

export default interface IRatingsRepository {
  findAll(company_id: string, paginate: any, filter: RateFilter, order: OrderBy): Promise<IPaginationResponse<Rate>>;
  findById(id: string, company_id: string): Promise<Rate | undefined>;
  findByRecipe(recipe_id: string, company_id: string): Promise<Rate[]>;
  create(data: ICreateRateDTO): Promise<Rate>;
  save(Rate: Rate): Promise<Rate>;
}
