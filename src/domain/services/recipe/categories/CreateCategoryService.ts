import ICategoriesRepository from "@domain/interfaces/recipe/ICategoriesRepository";
import Category from "@infra/typeorm/entities/recipe/Category";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  active: 0 | 1;
  levelId: string;
  companyId: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) { }

  public async execute({ name, active, levelId, companyId }: IRequest): Promise<Category> {
    const category = await this.categoryRepository.create({name, active, levelId, companyId});
    return category;
  }
}

export default CreateCategoryService;
