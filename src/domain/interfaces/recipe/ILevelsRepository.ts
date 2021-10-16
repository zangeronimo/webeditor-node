import ILevelDTO from "@domain/dtos/recipe/ILevelDTO";
import Level from "@infra/typeorm/entities/recipe/Level";

export default interface ILevelsRepository {
  findAll(company_id: string): Promise<Level[]>;
  findById(id: string, company_id: string): Promise<Level | undefined>;
  create(data: ILevelDTO): Promise<Level>;
  save(level: Level): Promise<Level>;
}
