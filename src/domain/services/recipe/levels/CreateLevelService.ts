import ILevelsRepository from "@domain/interfaces/recipe/ILevelsRepository";
import { slugGenerate } from "@domain/utils/slugGenerate";
import Level from "@infra/typeorm/entities/recipe/Level";

interface IRequest {
  name: string;
  active: 0 | 1;
  companyId: string;
}

class CreateLevelService {
  constructor(
    private levelRepository: ILevelsRepository,
  ) { }

  public async execute({ name, active, companyId }: IRequest): Promise<Level> {
    const slug = slugGenerate(name);
    const level = await this.levelRepository.create({slug, name, active, companyId});
    return level;
  }
}

export default CreateLevelService;
