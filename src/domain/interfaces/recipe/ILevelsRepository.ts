import ICreateLevelDTO from "@domain/dtos/recipe/ICreateLevelDTO";
import Level from "@infra/typeorm/entities/recipe/Level";
import { OrderBy } from "@infra/typeorm/repositories/BaseTypes";
import { LevelFilter } from "@infra/typeorm/repositories/recipe/LevelsRepository";
import { IPaginationResponse } from "../Base";

export default interface ILevelsRepository {
  findAll(company_id: string, paginate: any, filter: LevelFilter, order: OrderBy): Promise<IPaginationResponse<Level>>;
  findById(id: string, company_id: string): Promise<Level | undefined>;
  create(data: ICreateLevelDTO): Promise<Level>;
  save(level: Level): Promise<Level>;
}
