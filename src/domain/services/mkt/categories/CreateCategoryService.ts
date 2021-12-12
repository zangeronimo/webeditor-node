import ICategoriesRepository from "@domain/interfaces/mkt/ICategoriesRepository";
import { slugGenerate } from "@domain/utils/slugGenerate";
import Category from "@infra/typeorm/entities/mkt/Category";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  active: 0 | 1;
  companyId: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoryRepository: ICategoriesRepository,
  ) { }

  public async execute({ name, active, companyId }: IRequest): Promise<Category> {
    const slug = slugGenerate(name);
    const category = await this.categoryRepository.create({slug, name, active, companyId});
    return category;
  }
}

export default CreateCategoryService;
